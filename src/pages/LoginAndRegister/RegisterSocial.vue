<template>
	<www-page>
		<div class="page-content">
			<h1>Almost done...</h1>
			<p>To complete your registration, please agree to the Terms of Use and Privacy Policy</p>
			<form
				id="registerSocialTermsForm"
				class="promptForm"
				action="."
				@submit.prevent.stop="postRegisterSocialForm"
			>
				<div class="terms">
					<label>
						<input
							type="checkbox"
							id="terms_agreement_popup"
							name="terms_agreement_popup"
							v-model="newAcctTerms"
							@click="showNewAcctTermsError = validateTerms()"
						>
						I have read and agree to the Kiva
						<a href="/legal/terms" target="_blank">Terms of Use</a>
						and
						<a href="/legal/privacy" target="_blank">Privacy Policy</a>
					</label>
					<ul v-show="showNewAcctTermsError" class="validation-errors">
						<li>
							You must agree to the Kiva Terms of Use and Privacy Policy
						</li>
					</ul>
				</div>
				<KvButton
					class="register-button smaller"
					type="submit"
					name="regForm_submit"
					id="regForm_submit"
				>
					Complete registration
				</KvButton>
			</form>
			<div class="small-12">
				<a :href="`https://${$appConfig.auth0.domain}/v2/logout`">Cancel registration</a>
			</div>
		</div>
	</www-page>
</template>

<script>
import WwwPage from '@/components/WwwFrame/WwwPage';
import KvButton from '@/components/Kv/KvButton';

export default {
	components: {
		WwwPage,
		KvButton,
	},
	data() {
		return {
			newAcctTerms: false,
			showNewAcctTermsError: false,
		};
	},
	mounted() {
		if (!this.$route.query.state) {
			this.$router.push('/error');
		}
	},
	methods: {
		validateTerms() {
			return this.newAcctTerms;
		},

		postRegisterSocialForm() {
			// Validate the termsAgreementPopup is checked
			if (!this.validateTerms()) {
				// show error here
				this.showNewAcctTermsError = true;
			} else {
				window.location = `https://${this.$appConfig.auth0.domain}`
				+ `/continue?agree=yes&state=${this.$route.query.state}`;
			}
		},
	}

};
</script>

<style lang="scss" scoped>
@import 'settings';

.page-content {
	text-align: center;
	margin: 1.4rem 0 2rem 0;
}

</style>
