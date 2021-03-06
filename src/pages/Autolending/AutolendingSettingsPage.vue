<template>
	<div class="autolending-settings-page">
		<autolending-status />

		<!-- When your balance will be lent -->
		<autolending-when />

		<!-- Who you'll support-->
		<autolending-who />

		<div class="row column">
			<save-button v-if="isChanged" />
		</div>
	</div>
</template>

<script>
import _get from 'lodash/get';
import gql from 'graphql-tag';
import initAutolending from '@/graphql/mutation/autolending/initAutolending.graphql';
import SaveButton from './SaveButton';
import AutolendingStatus from './AutolendingStatus';
import AutolendingWhen from './AutolendingWhen';
import AutolendingWho from './AutolendingWho';

const pageQuery = gql`query autolendProfileEnabled {
	autolending @client {
		profileChanged
		currentProfile {
			isEnabled
		}
	}

}`;

export default {
	inject: ['apollo', 'federation'],
	components: {
		AutolendingWho,
		AutolendingStatus,
		AutolendingWhen,
		SaveButton,
	},
	data() {
		return {
			isChanged: false,
			isEnabled: false,
			showAdvanced: false,
			kivaChooses: true,
		};
	},
	apollo: {
		query: pageQuery,
		preFetch(config, client) {
			return new Promise((resolve, reject) => {
				client.query({
					query: gql`query userIsMonthlyGoodSubscriber {
							my {
								autoDeposit {
									isSubscriber
								}
							}
						}`
				})
					.then(({ data }) => {
						const isSubscriber = _get(data, 'my.autoDeposit.isSubscriber', false);
						if (isSubscriber) {
							throw new Error('monthlyGoodSubscriber');
						}
					})
					.then(() => client.mutate({ mutation: initAutolending }))
					.then(() => client.query({ query: pageQuery }))
					.then(resolve)
					.catch(e => {
						if (e.message.indexOf('monthlyGoodSubscriber') > -1) {
						// Redirect to legacy Monthly Good Settins page
							reject({
								path: '/settings/credit'
							});
						} else {
						// Log other errors
							console.error(e);
							resolve();
						}
					});
			});
		},
		result({ data }) {
			this.isChanged = !!_get(data, 'autolending.profileChanged');
			this.isEnabled = !!_get(data, 'autolending.currentProfile.isEnabled');
			this.kivaChooses = !!_get(data, 'autolending.currentProfile.kivaChooses');
		},
	},
	mounted() {
		window.addEventListener('beforeunload', this.onLeave);
	},
	beforeDestroy() {
		window.removeEventListener('beforeunload', this.onLeave);
	},
	methods: {
		onLeave(event) {
			if (this.isChanged) {
				// eslint-disable-next-line no-param-reassign
				event.returnValue = 'You have unsaved settings! Are you sure you want to leave?';
			}
		},
	},
};
</script>

<style lang="scss">
@import 'settings';

.autolending {
	.button {
		.loading-spinner {
			vertical-align: middle;
			width: 1rem;
			height: 1rem;

			& >>> .line {
				background-color: $white;
			}
		}
	}
}

</style>

<style lang="scss" scoped>
@import 'settings';

.autolending-settings-page {
	padding-bottom: 5rem;
}

</style>
