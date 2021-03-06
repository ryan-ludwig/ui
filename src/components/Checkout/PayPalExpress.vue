<template>
	<div class="paypal-holder">
		<div id="paypal-button" ref="paypalbutton"></div>
	</div>
</template>

<script>
/* global paypal */
import _get from 'lodash/get';
import numeral from 'numeral';
import * as Sentry from '@sentry/browser';
import checkoutUtils from '@/plugins/checkout-utils-mixin';
import getPaymentToken from '@/graphql/query/checkout/getPaymentToken.graphql';
import depositAndCheckout from '@/graphql/mutation/depositAndCheckout.graphql';

export default {
	inject: ['apollo'],
	mixins: [
		checkoutUtils
	],
	props: {
		amount: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			ensurePaypalScript: null,
			paypalRendered: false,
			loading: false
		};
	},
	metaInfo() {
		// ensure paypal script is loaded
		const paypalScript = {};
		// check for paypal incase script is already loaded
		if (typeof paypal === 'undefined') {
			paypalScript.type = 'text/javascript';
			paypalScript.src = 'https://www.paypalobjects.com/api/checkout.js';
		}
		return {
			script: [
				paypalScript
			]
		};
	},
	mounted() {
		this.initializePaypal();
	},
	watch: {
		amount() {
			this.initializePaypal();
		}
	},
	methods: {
		initializePaypal() {
			this.setUpdatingPaymentWrapper(true);
			// ensure paypal is loaded before calling
			this.ensurePaypalScript = window.setInterval(() => {
				if (typeof paypal !== 'undefined' && !this.paypalRendered) {
					this.renderPaypalButton();
				}
			}, 200);
		},
		renderPaypalButton() {
			// clear ensurePaypal interval
			window.clearInterval(this.ensurePaypalScript);
			// signify we've already rendered
			this.paypalRendered = true;
			// render paypal button
			paypal.Button.render(
				{
					env: this.$appConfig.paypal.environment,
					commit: true,
					payment: () => {
						this.$kvTrackEvent('basket', 'Paypal Payment', 'Button Click');

						return new paypal.Promise((resolve, reject) => {
							this.setUpdating(true);
							// validate our basket before getting the payment token
							return this.validateBasket()
								.then(validationStatus => {
									if (validationStatus === true) {
										// Use updated vars on render
										this.apollo.query({
											query: getPaymentToken,
											variables: {
												amount: numeral(this.amount).format('0.00'),
											}
										}).then(response => {
											if (response.errors) {
												this.setUpdating(false);
												reject(response);
											} else {
												const paymentToken = _get(response, 'data.shop.getPaymentToken');
												resolve(paymentToken || response);
											}
										})
											.catch(error => {
												console.error(error);
												// Fire specific exception to Sentry/Raven

												Sentry.withScope(scope => {
													scope.setTag('pp_stage', 'onPaymentGetPaymentTokenCatch');
													Sentry.captureException(JSON.stringify(error.errors ? error.errors : error)); // eslint-disable-line max-len
												});

												reject(error);
											});
									} else {
										// validation failed
										this.setUpdating(false);
										this.showCheckoutError(validationStatus);
										this.$emit('refreshtotals');
										reject(validationStatus);
									}
								})
								.catch(error => {
									this.setUpdating(false);
									console.error(error);

									// Fire specific exception to Sentry/Raven
									Sentry.withScope(scope => {
										scope.setTag('pp_stage', 'onPaymentValidationCatch');
										Sentry.captureException(JSON.stringify(error));
									});
								});
						});
					},
					onAuthorize: (data, actions) => {
						this.$kvTrackEvent('basket', 'Paypal Payment', 'ECK Dialog Pay Now Click');

						return new paypal.Promise((resolve, reject) => {
							// validate our basket before deposit and Checkout
							return this.validateBasket()
								.then(validationStatus => {
									if (validationStatus === true) {
										this.apollo.mutate({
											mutation: depositAndCheckout,
											variables: {
												amount: numeral(this.amount).format('0.00'),
												token: data.paymentToken,
												payerId: data.payerID
											},
										})
											.then(ppResponse => {
												// Check for errors
												if (ppResponse.errors) {
													this.setUpdating(false);
													const errorCode = _get(ppResponse, 'errors[0].code');
													// -> server supplied language is not geared for lenders
													const standardErrorCode = `(PayPal error: ${errorCode})`;
													const standardError = `There was an error processing your payment.
														Please try again. ${standardErrorCode}`;

													this.$showTipMsg(standardError, 'error');

													// Fire specific exception to Sentry/Raven
													Sentry.withScope(scope => {
														scope.setTag('pp_stage', 'onAuthorize');
														scope.setTag('pp_token', 'data.paymentToken');
														Sentry.captureException(JSON.stringify(ppResponse.errors));
													});

													// Restart the Exp Checkout interface to allow payment changes
													// 10539 'payment declined' error
													// 10486 transaction could not be completed
													if (errorCode === '10539' || errorCode === '10486') {
														return actions.restart();
													}
													// TODO: Are there other specific errors we should handle?

													// exit
													reject(data);
												}

												// Transaction is complete
												const transactionId = _get(
													ppResponse,
													'data.shop.doPaymentDepositAndCheckout'
												);
												// redirect to thanks with KIVA transaction id
												if (transactionId) {
													this.$kvTrackEvent(
														'basket',
														'Paypal Payment',
														'Success',
														transactionId
													);
													// Complete transaction handles additional analytics + redirect
													this.$emit('complete-transaction', transactionId);
												}
												resolve(ppResponse);
											})
											.catch(catchError => {
												this.setUpdating(false);

												// Fire specific exception to Sentry/Raven
												Sentry.withScope(scope => {
													scope.setTag('pp_stage', 'onAuthorizeCatch');
													Sentry.captureException(JSON.stringify(catchError));
												});

												reject(catchError);
											});
									} else {
										// validation failed
										this.setUpdating(false);
										this.showCheckoutError(validationStatus);
										this.$emit('refreshtotals');
										reject(validationStatus);
									}
								})
								.catch(error => {
									this.setUpdating(false);
									console.error(error);

									// Fire specific exception to Sentry/Raven
									Sentry.withScope(scope => {
										scope.setTag('pp_stage', 'onAuthorizeValidationCatch');
										Sentry.captureException(JSON.stringify(error));
									});
								});
						});
					},
					onError: data => {
						this.setUpdating(false);
						console.error(data);
					},
					onCancel: () => {
						this.setUpdating(false);
					},
					style: {
						color: 'blue',
						shape: 'rect',
						size: (typeof window === 'object' && window.innerWidth > 480) ? 'medium' : 'responsive',
						fundingicons: false,
					},
					funding: {
						disallowed: [paypal.FUNDING.CREDIT, paypal.FUNDING.VENMO]
					}
				},
				'#paypal-button'
			);
			// clear loader
			this.setUpdatingPaymentWrapper(false);
		},
		setUpdating(state) {
			this.loading = state;
			this.$emit('updating-totals', state);
		},
		setUpdatingPaymentWrapper(state) {
			this.$emit('updating-payment-wrapper', state);
		}
	}
};
</script>

<style lang="scss">
@import 'settings';

.paypal-holder {
	display: block;
	text-align: center;
	min-height: rem-calc(55);

	@include breakpoint(medium) {
		text-align: right;
	}

	#paypal-button {
		margin-bottom: $list-side-margin;
	}

	.pp-tagline {
		color: $kiva-text-light;
		text-align: center;

		@include breakpoint(medium) {
			text-align: right;
		}
	}
}
</style>
