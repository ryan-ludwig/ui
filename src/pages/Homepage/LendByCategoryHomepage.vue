<template>
	<div class="lend-by-category-homepage">
		<section class="featured-loans section">
			<div class="row">
				<div class="small-12 large-6 columns">
					carousel here
				</div>
				<div class="small-12 large-6 columns">
					<h1 class="huge">
						Make a loan, change a life.
					</h1>
					<p class="featured-text">
						Kiva empowers underserved people to achieve their
						dreams by crowdfunding loans and unlocking capital.
					</p>
				</div>
			</div>
		</section>
		<section class="loan-categories section">
			<div class="row">
				<div class="columns">
					<h2 class="large-text text-center">
						It's easy to find and fund a cause that matters to you.
					</h2>
				</div>
			</div>
		</section>
		<section class="loan-not-donation section text-center">
			<div class="row">
				<h2 class="large-text small-12 columns">
					A loan, not a donation.
				</h2>
				<p class="featured-text large-6 large-offset-3 columns">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
					vel alias molestias aliquam sequi voluptates, perferendis possimus hic quibusdam
					soluta. Rerum debitis voluptas tenetur, possimus vel provident.
				</p>
			</div>
		</section>
		<section class="how-kiva-works section text-center">
			<div class="row">
				<h2 class="large-text small-12 columns">
					How Kiva works
				</h2>
			</div>
		</section>
		<section class="statistics section text-center">
			<div class="row">
				<h2 class="large-text small-12 columns">
					Statistics
				</h2>
			</div>
		</section>
		<section class="lender-quotes section">
			<div class="row">
				<h2 class="large-text text-center small-12 columns">
					What our lending community thinks
				</h2>
			</div>
		</section>
		<section class="final-cta section text-center">
			<div class="row">
				<div class="columns">
					<p class="final-cta__text impact-text">
						By lending as little as $25, you can help people around the world
						create opportunity for themselves and their communities.
					</p>
					<kv-button
						:to="`/lend-by-category`"
					>
						<!-- TODO: add tracking -->
						Get started
					</kv-button>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import KvButton from '@/components/Kv/KvButton';

export default {
	components: {
		KvButton,
	},
	props: {
	},
	data() {
		return {};
	},
	computed: {
	},
	created() {
	},
	mounted() {
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
@import 'settings';

// Individual blocks, BEM it up from here
.featured-loans {
	background: $dark-charcoal;
	color: #fff;
}

.loan-categories {
	background: hsl(100, 100, 90);
}

.loan-not-donation {
	background: hsl(80, 100, 90);
}

.how-kiva-works {
	background: hsl(60, 100, 90);
}

.statistics {
	background: hsl(40, 100, 90);
}

.lender-quotes {
	background: hsl(20, 100, 90);
}

.final-cta {
	background: hsl(0, 100, 90);

	&__text {
		font-weight: 300;
		margin-bottom: 2rem;
	}
}

// utils
.section {
	padding: 5rem 0;
}
</style>