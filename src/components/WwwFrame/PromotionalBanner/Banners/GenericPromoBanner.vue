<template>
	<div class="row align-center generic-banner">
		<component
			:is="currentWrapperComponent"
			:to="promoBannerContent.link"
			:class="{ 'banner-link' : promoBannerContent.link, 'banner-wrapper' : !promoBannerContent.link}"
			v-kv-track-event="promoBannerContent.kvTrackEvent"
		>
			<kv-icon :name="iconKey" :class="`${iconKey}-icon icon`" />
			<div class="content" v-html="promoBannerContent.richText">
			</div>
		</component>
	</div>
</template>

<script>
import KvIcon from '@/components/Kv/KvIcon';

export default {
	components: {
		KvIcon
	},
	computed: {
		// if the promoBannerContent includes a link, render a router-link element, else render a plain div
		currentWrapperComponent() {
			if (this.promoBannerContent.link) {
				return 'router-link';
			}
			return 'div';
		}
	},
	props: {
		iconKey: {
			type: String,
			default: 'info'
		},
		promoBannerContent: {
			type: Object,
			default() {
				return {
					kvTrackEvent: [],
					link: '',
					richText: '',
				};
			}
		},
	},
};
</script>

<style  lang="scss" scoped>
@import 'settings';

.row {
	margin: 0;
	max-width: 100%;
}

.content {
	text-align: center;
	display: block;
	// contentful rich text content is wrapped in a p tag, this removes all styles from it
	::v-deep p {
		display: inline;
		margin: 0;
		padding: 0;
	}
}

.generic-banner {
	background-image: url('~@/assets/images/backgrounds/tipbar-bg-small.jpg');
	background-position: bottom;

	.icon {
		flex-shrink: 0;
	}

	& [class*="-icon"] {
		display: block;
		height: rem-calc(22);
		width: rem-calc(22);
		margin-right: rem-calc(10);
		margin-top: -0.2rem;
		fill: $kiva-icon-green;
	}

	.icon-corporate,
	.icon-iwd {
		fill: inherit;
	}

	.banner-link,
	.banner-wrapper {
		display: flex;
		align-items: center;
		color: $kiva-icon-green;
		text-decoration: none;
		text-align: center;
		padding: 0.365rem;
		line-height: 1.25;
	}

	.banner-link {
		&:hover,
		&:active {
			color: $kiva-darkgreen;

			[class*="-icon"] {
				fill: $kiva-darkgreen;
			}

			.icon-corporate,
			.icon-iwd {
				fill: inherit;
			}
		}
	}
}
</style>
