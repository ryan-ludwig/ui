<template>
	<div class="lend-by-category-homepage">
		<section class="featured-loans section">
			<div class="row align-center">
				<div class="small-12 medium-10 large-7 xlarge-6 small-order-2 large-order-1 columns">
					<featured-loans-carousel />
				</div>
				<!-- eslint-disable-next-line max-len -->
				<div class="small-10 large-5 xlarge-6 small-order-1 large-order-2 align-self-middle columns featured-loans__cta_wrapper">
					<h1 class="featured-loans__header">
						Make a loan, <br class="so mo"> change a life.
					</h1>
					<p class="featured-loans__body">
						Kiva empowers underserved people to achieve their
						dreams by crowdfunding loans and unlocking capital.
						<br>
						<router-link
							class="show-for-large"
							:to="'/lend-by-category'"
							v-kv-track-event="[
								'homepage',
								'click-hero-cta',
								'Get started',
							]"
						>
							Get started
						</router-link>
					</p>
				</div>
			</div>
			<kv-responsive-image
				class="featured-loans__flourish"
				:images="flourishImgs.redRight"
				loading="lazy"
				alt=""
			/>
		</section>

		<section class="loan-categories section">
			<div class="row">
				<div class="columns">
					<h2 class="loan-categories__header text-center">
						Kiva makes it easy to support causes you care about.
					</h2>
					<loan-categories-section />
				</div>
			</div>
		</section>

		<section class="loan-not-donation section text-center">
			<div class="row">
				<kv-responsive-image
					class="loan-not-donation__img"
					:images="loanNotDonationImgs.header"
					loading="lazy"
					alt=""
				/>
				<h2 class="loan-not-donation__header small-12 columns">
					It's a loan, not a donation
				</h2>
				<p class="loan-not-donation__body large-6 large-offset-3 columns">
					Kiva is a loan, not a donation, allowing you to cycle your money and
					create a personal impact across the world. Plus, you can withdraw your funds at any time.
				</p>
			</div>
			<kv-responsive-image
				class="loan-not-donation__flourish"
				:images="flourishImgs.greenLeft"
				loading="lazy"
				alt=""
			/>
		</section>

		<section class="how-it-works section text-center">
			<div class="row">
				<h2 class="how-it-works__header small-12 columns">
					How it works
				</h2>
				<p class="large-6 large-offset-3 columns">
					By lending as little as $25 on Kiva, you can support the causes you care
					about and make a real personal impact.
				</p>
			</div>
			<ol class="how-it-works__list row">
				<li class="how-it-works__li small-12 xxlarge-3 columns">
					<kv-responsive-image
						class="how-it-works__img how-it-works__img--borrower"
						:images="howItWorksImgs.borrower"
						loading="lazy"
						alt=""
					/>
					<h3 class="how-it-works__subtitle">
						Choose a borrower
					</h3>
					<p>Browse by category and find an entrepeneur to support</p>
				</li>
				<li class="how-it-works__li small-12 xxlarge-3 columns">
					<kv-responsive-image
						class="how-it-works__img how-it-works__img--loan"
						:images="howItWorksImgs.loan"
						loading="lazy"
						alt=""
					/>
					<h3 class="how-it-works__subtitle">
						Make a loan
					</h3>
					<p>
						Help fund a loan <br class="xxlu"> with as little as $25.
					</p>
				</li>
				<li class="how-it-works__li small-12 xxlarge-3 columns">
					<kv-responsive-image
						class="how-it-works__img how-it-works__img--repaid"
						:images="howItWorksImgs.repaid"
						loading="lazy"
						alt=""
					/>
					<h3 class="how-it-works__subtitle">
						Get repaid
					</h3>
					<p>Kiva borrowers have a 96% repayment rate historically.</p>
				</li>
				<li class="how-it-works__li small-12 xxlarge-3 columns">
					<kv-responsive-image
						class="how-it-works__img how-it-works__img--repeat"
						:images="howItWorksImgs.repeat"
						loading="lazy"
						alt=""
					/>
					<h3 class="how-it-works__subtitle">
						Repeat
					</h3>
					<p>Relend your money or withdraw your funds.</p>
				</li>
			</ol>
		</section>

		<section class="statistics section text-center">
			<div class="row">
				<div class="small-12 columns">
					<kv-responsive-image
						class="statistics__img"
						:images="statistics"
						loading="lazy"
						alt=""
					/>
				</div>
				<div class="small-12 columns">
					<h2 class="statistics__header">
						<span>100%</span>
						<span class="statistics__header-small">of your loan goes to the field.</span>
					</h2>
					<p class="statistics__body">
						We don't take a penny.
					</p>
				</div>
				<homepage-statistics />
				<kv-responsive-image
					class="statistics__flourish"
					:images="flourishImgs.pinkRight"
					loading="lazy"
					alt=""
				/>
			</div>
		</section>

		<section class="lender-quotes section">
			<div class="row">
				<h2 class="lender-quotes__header text-center small-12 columns">
					What our lending <br class="so mo"> community thinks
				</h2>
				<div
					v-for="lenderQuote in lenderQuotes"
					:key="lenderQuote.name"
					:class="`quote-card small-10 medium-8 large-5 columns`"
				>
					<kv-responsive-image
						class="quote-card__flourish"
						:images="[
							['small', lenderQuote.background],
						]"
						loading="lazy"
						alt=""
					/>
					<img
						:src="lenderQuote.image"
						class="quote-card__lender-img"
						loading="lazy"
						:alt="lenderQuote.attribution"
					>
					<p class="quote-card__quote">
						{{ lenderQuote.quote }}
					</p>
					<p class="quote-card__attribution">
						{{ lenderQuote.attribution }},
					</p>
					<p class="quote-card__title">
						{{ lenderQuote.title }}
					</p>
				</div>
			</div>
			<kv-responsive-image
				class="lender-quotes__flourish"
				:images="flourishImgs.yellowLeft"
				loading="lazy"
				alt=""
			/>
		</section>

		<section class="final-cta section text-center">
			<div class="row">
				<div class="columns">
					<p class="final-cta__body">
						Make a loan today!
					</p>
					<kv-button
						:to="`/lend-by-category`"
						v-kv-track-event="[
							'homepage',
							'click-bottom-cta',
							'Get started'
						]"
					>
						Get started
					</kv-button>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import KvButton from '@/components/Kv/KvButton';
import KvResponsiveImage from '@/components/Kv/KvResponsiveImage';
import LoanCategoriesSection from '@/components/Homepage/LendByCategory/LoanCategoriesSection';
import FeaturedLoansCarousel from '@/components/Homepage/LendByCategory/FeaturedLoansCarousel';
import HomepageStatistics from './HomepageStatistics';

const imgRequire = require.context('@/assets/images/lend-by-category-homepage/', true);

export default {
	components: {
		FeaturedLoansCarousel,
		HomepageStatistics,
		KvButton,
		KvResponsiveImage,
		LoanCategoriesSection,
	},
	data() {
		return {
			pageViewTracked: false,
			loanNotDonationImgs: {
				header: [
					['small', imgRequire('./loan-not-donation.png')],
					['small retina', imgRequire('./loan-not-donation_2x.png')],
				],
			},
			howItWorksImgs: {
				borrower: [
					['small', imgRequire('./how-it-works-borrower.png')],
					['small retina', imgRequire('./how-it-works-borrower_2x.png')],
				],
				loan: [
					['small', imgRequire('./how-it-works-loan.png')],
					['small retina', imgRequire('./how-it-works-loan_2x.png')],
				],
				repaid: [
					['small', imgRequire('./how-it-works-repaid.png')],
					['small retina', imgRequire('./how-it-works-repaid_2x.png')],
				],
				repeat: [
					['small', imgRequire('./how-it-works-repeat.png')],
					['small retina', imgRequire('./how-it-works-repeat_2x.png')],
				],
			},
			statistics: [
				['small', imgRequire('./stats.png')],
				['small retina', imgRequire('./stats_2x.png')],
			],
			lenderQuotes: [
				{

					image: imgRequire('./lender-quote-heather.jpg'),
					// eslint-disable-next-line max-len
					quote: 'Being able to lend, then get repaid, and lend over and over again gives great satisfaction. My funds have been lent 12 times over.',
					attribution: 'Heather McLaughlin',
					title: 'Kiva lender',
					background: imgRequire('./lender-quote-card-texture-yellow.png'),
				},
				{
					image: imgRequire('./lender-quote-jenae.jpg'),
					// eslint-disable-next-line max-len
					quote: 'Just made my 11th loan to a single mother in Nicaragua. Constantly blown away by the impact from the same $25 being lent over and over again.',
					attribution: 'Jenae Journot',
					title: 'Kiva lender',
					background: imgRequire('./lender-quote-card-texture-red.png'),
				},
			],
			flourishImgs: {
				greenLeft: [
					['small', imgRequire('./flourish-green-left.png')],
					['large', imgRequire('./flourish-green-left.png')],
					['large retina', imgRequire('./flourish-green-left_2x.png')],
				],
				redRight: [
					['small', imgRequire('./flourish-red-right.png')],
					['large', imgRequire('./flourish-red-right.png')],
					['large retina', imgRequire('./flourish-red-right_2x.png')],
				],
				pinkRight: [
					['small', imgRequire('./flourish-pink-right.png')],
					['large', imgRequire('./flourish-pink-right.png')],
					['large retina', imgRequire('./flourish-pink-right_2x.png')],
				],
				yellowLeft: [
					['small', imgRequire('./flourish-yellow-left.png')],
					['large', imgRequire('./flourish-yellow-left.png')],
					['large retina', imgRequire('./flourish-yellow-left_2x.png')],
				],
			},
		};
	},
};
</script>

<style lang="scss" scoped>
@import 'settings';

// utils
.section {
	position: relative;
	padding: 3rem 0;

	@include breakpoint(large) {
		padding: 6rem 0;
	}
}

.lend-by-category-homepage {
	overflow: hidden;
}

.featured-loans {
	padding: 2rem 0 0;

	@include breakpoint(large) {
		padding: 4rem 0 0;
	}

	&__cta_wrapper {
		padding: 1.5rem 2rem 3rem;
	}

	&__header {
		@include large-text();

		@include breakpoint(xlarge) {
			@include huge-headline();
		}
	}

	&__body {
		@include medium-text();

		@include breakpoint(xlarge) {
			@include featured-text();
		}
	}

	&__flourish {
		position: absolute;
		width: 40%;
		max-width: rem-calc(436);
		top: 28%;
		right: 0;
		bottom: auto;
		pointer-events: none;
		z-index: -1;

		@include breakpoint(medium) {
			width: 31%;
			bottom: -5%;
			top: auto;
		}
	}
}

.loan-categories {
	padding: 1rem 0 3rem;

	@include breakpoint(large) {
		padding: 2rem 0 5rem;
	}

	& .row {
		max-width: 69.15rem;
	}

	&__header {
		font-weight: bold;

		@include breakpoint(large) {
			@include large-text();
		}
	}
}

.loan-not-donation {
	&__header {
		font-weight: bold;

		@include breakpoint(large) {
			@include large-text();
		}
	}

	&__body {
		@include breakpoint(large) {
			@include featured-text();
		}
	}

	&__flourish {
		position: absolute;
		width: 20%;
		max-width: 17rem;
		top: 0;
		left: -3%;
		pointer-events: none;
		z-index: -1;

		@include breakpoint(large) {
			left: 0;
			top: -10%;
		}
	}

	&__img {
		margin: 0 auto 1rem;
		width: rem-calc(134);
	}
}

.how-it-works {
	&__header {
		font-weight: bold;

		@include breakpoint(large) {
			@include large-text();
		}
	}

	&__list {
		list-style: none;
		margin-top: 1rem;
		margin-bottom: 0;
		padding: 0;
	}

	&__li {
		margin-bottom: 1rem;
	}

	&__img {
		width: rem-calc(81);
		height: rem-calc(100);
		margin: 0 auto 1rem;

		&--borrower {
			width: rem-calc(81);
		}

		&--loan {
			width: rem-calc(124);
		}

		&--repaid {
			width: rem-calc(87);
		}

		&--repeat {
			width: rem-calc(94);
		}
	}

	&__subtitle {
		font-weight: bold;

		@include breakpoint(large) {
			@include featured-text();
		}
	}
}

.statistics {
	&__img {
		width: rem-calc(235);
		margin: 0 auto 1rem;
	}

	&__header {
		font-size: 6rem;
		font-weight: bold;
		margin-bottom: 0;

		span {
			display: block;
		}
	}

	&__header-small {
		@include featured-text();

		font-weight: $global-weight-normal;
	}

	&__body {
		@include featured-text();

		margin-bottom: rem-calc(30);
	}

	&__flourish {
		position: absolute;
		width: 18%;
		max-width: rem-calc(213);
		top: -100%;
		right: 0;
		pointer-events: none;

		@include breakpoint(xlarge) {
			top: -50%;
			width: 25%;
		}
	}
}

.lender-quotes {
	&__header {
		margin-bottom: 2rem;
		font-weight: bold;

		@include breakpoint(large) {
			@include large-text();
		}
	}

	&__flourish {
		display: none;

		@include breakpoint(large) {
			display: block;
			position: absolute;
			width: 13%;
			max-width: 17rem;
			top: -30%;
			left: 0;
			pointer-events: none;
			z-index: -1;
		}
	}

	.quote-card {
		@include featured-text();

		margin: 0 auto rem-calc(25) auto;
		text-align: center;
		border-radius: 1rem;
		background: $white;
		box-shadow: 0 0 1.2rem 1rem rgb(153, 153, 153, 0.1);
		position: relative;
		overflow: hidden;
		z-index: 1;

		@include breakpoint(large) {
			@include medium-text();
		}

		&__lender-img {
			margin: rem-calc(30) auto rem-calc(30) auto;
			width: 5.5rem;
			border-radius: 50%;

			@include breakpoint(large) {
				width: 4rem;
			}
		}

		&__quote {
			line-height: 1.3;
			margin-bottom: rem-calc(30);
		}

		&__attribution {
			line-height: 1.3;
			font-weight: bold;
			margin-bottom: 0;
			position: relative;
		}

		&__title {
			position: relative;
			margin-bottom: rem-calc(30);
		}

		&__flourish {
			position: absolute;
			z-index: -1;
		}
	}

	.quote-card:nth-child(even) {
		@include breakpoint(large) {
			margin-right: 0.9rem;
		}

		.quote-card__flourish {
			top: 0;
			left: 0;
			width: 10rem;

			@include breakpoint(large) {
				width: 8rem;
			}
		}
	}

	.quote-card:nth-child(odd) {
		@include breakpoint(large) {
			margin-left: 0.9rem;
		}

		.quote-card__flourish {
			bottom: 4rem;
			right: 0;
			width: 7.5rem;

			@include breakpoint(large) {
				width: 5.5rem;
			}
		}
	}
}

.final-cta {
	&__body {
		@include featured-text();

		margin-bottom: 1rem;

		@include breakpoint(large) {
			@include impact-text();

			font-weight: 300;
			margin-bottom: 2rem;
		}
	}
}

</style>
