<template>
	<component :is="currentActivePromo" :bonus-balance="bonusBalance" />
</template>

<script>
import numeral from 'numeral';
import _get from 'lodash/get';
import promoQuery from '@/graphql/query/promotionalBanner.graphql';
import BonusBanner from './Banners/BonusBanner';
import LendingRewardsBanner from './Banners/LendingRewardsBanner';

export default {
	inject: ['apollo'],
	data() {
		return {
			bonusBalance: 0,
			lendingRewardOffered: false,
		};
	},
	computed: {
		currentActivePromo() {
			if (this.lendingRewardOffered) {
				return LendingRewardsBanner;
			}
			if (this.bonusBalance > 0) { // TODO: skip if on a checkout/basket page
				return BonusBanner;
			}
			return null;
		}
	},
	apollo: {
		query: promoQuery,
		preFetch: true,
		result({ data }) {
			const promoBalance = numeral(_get(data, 'my.userAccount.promoBalance')).value();
			const bonusAvailableTotal = numeral(
				_get(data, 'shop.basket.totals.bonusAvailableTotal')
			).value();
			const freeTrialAvailableTotal = numeral(
				_get(data, 'shop.basket.totals.freeTrialAvailableTotal')
			).value();
			const redemptionCodeAvailableTotal = numeral(
				_get(data, 'shop.basket.totals.redemptionCodeAvailableTotal')
			).value();
			const universalCodeAvailableTotal = numeral(
				_get(data, 'shop.basket.totals.universalCodeAvailableTotal')
			).value();
			this.bonusBalance = promoBalance
				+ bonusAvailableTotal
				+ freeTrialAvailableTotal
				+ redemptionCodeAvailableTotal
				+ universalCodeAvailableTotal;
			this.lendingRewardOffered = _get(data, 'shop.lendingRewardOffered');
		}
	},
};
</script>
