<template>
	<www-page id="homepage"
		:header-theme="headerTheme"
		:footer-theme="footerTheme"
	>
		<component :is="activeHomepage" :content="takeOverContent" />
	</www-page>
</template>

<script>
import _get from 'lodash/get';
import gql from 'graphql-tag';
import { settingEnabled } from '@/util/settingsUtils';
import experimentVersionFragment from '@/graphql/fragments/experimentVersion.graphql';
import experimentQuery from '@/graphql/query/experimentAssignment.graphql';
import {
	lightHeader, lightFooter, iwdHeaderTheme, iwdFooterTheme, wrdHeaderTheme, wrdFooterTheme
} from '@/util/siteThemes';
import WwwPage from '@/components/WwwFrame/WwwPage';
import DefaultHomePage from '@/pages/Homepage/DefaultHomepage';
import LendByCategoryHomepage from '@/pages/Homepage/LendByCategoryHomepage';
// import IWDHomePage from '@/pages/Homepage/iwd/IWDHomepage';
// import WRDHomePage from '@/pages/Homepage/wrd/WRDHomepage';
import { documentToHtmlString } from '~/@contentful/rich-text-html-renderer';

import TopMessageContentful from './TopMessageContentful';

const activePageQuery = gql`query homepageFrame {
	contentful {
		entries(contentType: "uiSetting", contentKey: "ui-homepage-takeover")
	}
	general {
		uiExperimentSetting(key: "home_lendbycategory") {
			key
			value
		}
	}
}`;

export default {
	inject: ['apollo'],
	components: {
		WwwPage,
		DefaultHomePage,
		LendByCategoryHomepage,
		// IWDHomePage,
		// WRDHomePage,
		TopMessageContentful,
	},
	data() {
		return {
			isLendByCategoryActive: false,
			isIwdActive: false,
			isWrdActive: false,
			isMessageActive: false,
			takeOverContent: '',
		};
	},
	computed: {
		activeHomepage() {
			if (this.isLendByCategoryActive) return LendByCategoryHomepage;
			if (this.isMessageActive) return TopMessageContentful;
			// if (this.isIwdActive) return IWDHomePage;
			// if (this.isWrdActive) return WRDHomePage;
			return DefaultHomePage;
		},
		headerTheme() {
			if (this.isLendByCategoryActive) return lightHeader;
			if (this.isMessageActive) return lightHeader;
			if (this.isIwdActive) return iwdHeaderTheme;
			if (this.isWrdActive) return wrdHeaderTheme;
			return null;
		},
		footerTheme() {
			if (this.isMessageActive) return lightFooter;
			if (this.isIwdActive) return iwdFooterTheme;
			if (this.isWrdActive) return wrdFooterTheme;
			return null;
		}
	},
	apollo: {
		query: activePageQuery,
		preFetch(config, client) {
			return client.query({
				query: activePageQuery
			}).then(() => {
				return client.query({
					query: experimentQuery, variables: { id: 'home_lendbycategory' }
				});
			});
		},
		result({ data }) {
			// lend-by-category as homepage experiment - EXP-GROW-138-Jul2020
			const lendByCategoryExperiment = this.apollo.readFragment({
				id: 'Experiment:home_lendbycategory',
				fragment: experimentVersionFragment,
			}) || {};
			this.isLendByCategoryActive = lendByCategoryExperiment.version === 'shown';
			// Fire Event for EXP-GROW-138-Jul2020
			if (lendByCategoryExperiment.version && lendByCategoryExperiment.version !== 'unassigned') {
				this.$kvTrackEvent(
					'Home',
					'EXP-GROW-138-Jul2020',
					lendByCategoryExperiment.version === 'shown' ? 'b' : 'a'
				);
			}
			// GROW-138 (if shown) takes precedence over "take-over settings"
			if (!this.isLendByCategoryActive) {
				// determine if take-over setting is active
				const contentSetting = _get(data, 'contentful.entries.items', []).find(item => item.fields.key === 'ui-homepage-takeover'); // eslint-disable-line max-len
				if (_get(contentSetting, 'fields')) {
					const isContentEnabled = settingEnabled(
						contentSetting.fields,
						'active',
						'startDate',
						'endDate'
					);
					if (isContentEnabled) {
						const takeOverKey = _get(contentSetting, 'fields.dataObject.takeOverKey');

						switch (takeOverKey) {
							case 'WRD':
								this.isWrdActive = true;
								break;
							case 'IWD':
								this.isIwdActive = true;
								break;
							case 'BLM':
								this.isMessageActive = true;
								break;
							default:
								break;
						}
						const activeContent = _get(contentSetting, 'fields.content[0]');
						if (activeContent) {
							this.takeOverContent = documentToHtmlString(activeContent.fields.bodyCopy);
						}
					}
				}
			}
		}
	}
};
</script>
