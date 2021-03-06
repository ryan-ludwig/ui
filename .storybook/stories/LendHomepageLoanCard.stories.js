import Vue from 'vue'
import StoryRouter from 'storybook-vue-router';
import { text, number, boolean } from '@storybook/addon-knobs';
import apolloStoryMixin from '../mixins/apollo-story-mixin';
import loanDataPropStoryMixin from '../mixins/loan-data-prop-story-mixin';

import LendHomepageLoanCard from '@/components/LoanCards/LendHomepageLoanCard';

// import plugins
import kivaPlugins from '@/plugins';
Vue.use(kivaPlugins)

export default {
	title: 'Loan Cards/Lend Homepage Loan Card',
	component: LendHomepageLoanCard,
	decorators: [StoryRouter()],
};

export const Default = () => ({
	mixins: [apolloStoryMixin, loanDataPropStoryMixin],
	components: {
		LendHomepageLoanCard,
	},
	props: {
		amountLeft: {
			type: Number,
			default: number("Amount Left", 250),
		},
		expiringSoonMessage: {
			type: String,
			default: `${text('Expiring Soon Message', 'Only 3 Days Left!')}`
		},
		isFavorite: {
			type: Boolean,
			default: boolean('Favorite', false)
		},
		isExpired: {
			type: Boolean,
			default: boolean('isExpired', false)
		},
		isFunded: {
			type: Boolean,
			default: boolean('Funded', false)
		},
		isSelectedByAnother: {
			type: Boolean,
			default: boolean('Selected by Another', false)
		},
		isVisitor: {
			type: Boolean,
			default: boolean('Visitor', false)
		},
		itemsInBasket: {
			type: Array,
			default: () => [boolean('Loan In Basket', false) ? 1 : 0],
		},
		percentRaised: {
			type: Number,
			default: number('Percent Raised', .8, {
				range: true,
				min: 0,
				max: 1,
				step: .1,
			 }),
		},
	},
	computed: {
		styling: function() {
			return {
				maxWidth: '476px',
			}
		},
	},
	template: `
		<div :style="styling">
			<lend-homepage-loan-card
				class="lend-homepage-loan-card"
				:amount-left="amountLeft"
				:expiring-soon-message="expiringSoonMessage"
				:is-expired="isExpired"
				:is-funded="isFunded"
				:is-selected-by-another="isSelectedByAnother"
				:is-visitor="isVisitor"
				:is-favorite="isFavorite"
				:items-in-basket="itemsInBasket"
				:loan="loan"
				:percent-raised="percentRaised"
			/>
			<component is="style">
				.lend-homepage-loan-card {
					border-radius: 0.65rem;
					box-shadow: 0 0.65rem 0.875rem 0.4375rem hsla(0,0%,60%,.1);
				}
   			 </component>
		</div>
	`,
});
