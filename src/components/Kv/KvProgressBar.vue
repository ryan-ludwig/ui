<template>
	<progress
		class="kv-progress-bar" :max="max" :value="value"
	></progress>
</template>

<script>

export default {
	props: {
		max: {
			type: String,
			default: '100',
		},
		value: {
			type: String,
			required: true
		},
	},
};
</script>

<style lang="scss" scoped>
@import 'settings';

.kv-progress-bar {
	$background-color: #fff;
	$foreground-color: $kiva-accent-blue;

	display: block;
	width: 100%;
	height: rem-calc(9);
	background-color: $background-color;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;

	/* firefox */
	&::-moz-progress-bar {
		background: $foreground-color;
	}

	/* webkit browsers */
	&::-webkit-progress-bar {
		background: $background-color;
		box-shadow: 0;
	}

	&::-webkit-progress-value {
		background: $foreground-color;
	}

	/* IE */
	&::-ms-fill {
		background: $foreground-color;
		box-shadow: 0;
	}
}
</style>
