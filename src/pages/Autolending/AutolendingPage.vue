<template>
	<www-page class="autolending" :gray-background="true">
		<div class="title-area">
			<div class="row column">
				<h2>Auto-lending settings</h2>
				<h3>Make the impact you want even if you’re away from your account for a while</h3>
			</div>
		</div>
		<router-view />
	</www-page>
</template>

<script>
import WwwPage from '@/components/WwwFrame/WwwPage';

export default {
	components: {
		WwwPage,
	},
};
</script>

<style lang="scss">
@import 'settings';

.autolending {
	.title-area {
		padding: 1.625rem 0;
		margin-bottom: 2rem;
		background-color: $white;
	}
}
</style>
