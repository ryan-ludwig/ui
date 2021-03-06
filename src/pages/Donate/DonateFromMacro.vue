<template>
	<www-page
		id="donate-landing"
		:header-theme="headerTheme"
		:footer-theme="footerTheme"
	>
		<donate-from-macro-hero
			:data="donateFromMacroContent"
		/>

		<div class="FAQ-wrapper section">
			<div class="row">
				<div class="columns">
					<h2 class="strong">
						Frequently Asked Questions
					</h2>
					<div v-html="faqCopy"></div>
				</div>
			</div>
		</div>

		<div class="impact-wrapper section">
			<div class="row">
				<div class="small-12 large-6 columns">
					<kv-responsive-image class="impact-wrapper__img" :images="impactImageSet" alt="" />
				</div>
				<div class="small-12 large-6 columns">
					<h2 class="impact-wrapper__header" v-html="this.impactHeadline">
					</h2>
					<div v-html="impactBodyCopy"></div>
				</div>
			</div>
		</div>
	</www-page>
</template>

<script>
import _get from 'lodash/get';
import gql from 'graphql-tag';

import { lightHeader, lightFooter } from '@/util/siteThemes';
import WwwPage from '@/components/WwwFrame/WwwPage';
import DonateFromMacroHero from '@/pages/Donate/DonateFromMacroHero';
import { processContent } from '@/util/contentfulUtils';
import KvResponsiveImage from '@/components/Kv/KvResponsiveImage';
import { documentToHtmlString } from '~/@contentful/rich-text-html-renderer';

const billionImpactImagesRequire = require.context('@/assets/images/10-years-billion-impact', true);

const pageQuery = gql`query donateContent {
	contentful {
		entries (contentType: "page", contentKey: "support-kiva")
	}
}`;

export default {
	metaInfo: {
		title: 'Donate to help support Kiva today'
	},
	components: {
		WwwPage,
		DonateFromMacroHero,
		KvResponsiveImage,
	},
	data() {
		return {
			headerTheme: lightHeader,
			footerTheme: lightFooter,
			donationFAQs: null,
			impactHeadline: '',
			impactBody: '',
			donateFromMacroContent: () => {},
			impactImageSet: [
				['small', billionImpactImagesRequire('./10-years-billion-impact_ghost.jpg')],
				['small retina', billionImpactImagesRequire('./10-years-billion-impact_2x_ghost.jpg')],
			]
		};
	},
	inject: ['apollo'],
	apollo: {
		query: pageQuery,
		preFetch(config, client) {
			return client.query({
				query: pageQuery
			});
		},
		result({ data }) {
			const contentfulPageData = _get(data, 'contentful.entries.items');
			if (!contentfulPageData) {
				return false;
			}
			// Processing data from contentful
			// eslint-disable-next-line
			this.donateFromMacroContent = processContent(contentfulPageData);
			// pulling the FAQs off the data for use in faqCopy computed function
			// eslint-disable-next-line
			this.donationFAQs = _get(this.donateFromMacroContent, 'page.pageLayout.fields.contentGroups[1].fields.content.fields.bodyCopy');
			// eslint-disable-next-line max-len
			this.allDonationImpactText = _get(this.donateFromMacroContent, 'page.pageLayout.fields.contentGroups[2].fields.content.fields');
			this.impactHeadline = _get(this.allDonationImpactText, 'headline');
			this.impactBody = _get(this.allDonationImpactText, 'bodyCopy');
		},
	},
	computed: {
		faqCopy() {
			return documentToHtmlString(this.donationFAQs);
		},
		impactBodyCopy() {
			return documentToHtmlString(this.impactBody);
		},
	}
};
</script>

<style lang="scss" scoped>
@import 'settings';

.page-content {
	padding: 1.625rem 0;
}

.section {
	margin-bottom: 2rem;

	@include breakpoint(xlarge) {
		margin-bottom: 5rem;
	}
}

.FAQ-wrapper {
	margin-top: 2rem;

	@include breakpoint(xlarge) {
		margin-top: 5rem;
	}

	h2 {
		margin-bottom: 1rem;
	}
}

.impact-wrapper {
	background: $kiva-bg-lightgray;
	padding-top: 2rem;
	padding-bottom: 2rem;

	@include breakpoint(xlarge) {
		padding-top: 5rem;
		padding-bottom: 5rem;
	}

	&__img {
		width: 100%;
		margin-bottom: 2rem;

		@include breakpoint(large) {
			margin-bottom: 0;
			padding-right: 2rem;
		}
	}

	&__header {
		@include large-text();

		margin-bottom: 1rem;
	}
}
</style>
