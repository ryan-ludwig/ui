import StoryRouter from 'storybook-vue-router';
import apolloStoryMixin from '../mixins/apollo-story-mixin';
import kvAuth0StoryMixin from '../mixins/kv-auth0-story-mixin';

import { lightHeader, lightFooter, iwdHeaderTheme, iwdFooterTheme, wrdHeaderTheme, wrdFooterTheme } from '@/util/siteThemes';

import WwwPageMinimal from '@/components/WwwFrame/WwwPageMinimal';

export default {
	title: 'WwwFrame/WwwPageMinimal',
	component: WwwPageMinimal,
	decorators: [StoryRouter()],
	args: {
		headerTheme: null,
		footerTheme: null
	},
	argTypes: {
		headerTheme: {
			control: {
				type: 'select',
				options: {
					'none': null,
					'lightHeader':lightHeader,
					'iwdHeaderTheme': iwdHeaderTheme,
					'wrdHeaderTheme': wrdHeaderTheme,
				},
			}
		},
		footerTheme: {
			control: {
				type: 'select',
				options: {
					'none': null,
					'lightFooter':lightFooter,
					'iwdFooterTheme': iwdFooterTheme,
					'wrdFooterTheme': wrdFooterTheme,
				},
			}
		},
	},
};

export const Default = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: {
		WwwPageMinimal
	},
	mixins: [apolloStoryMixin, kvAuth0StoryMixin],
	template: `
		<www-page-minimal
			:header-theme="headerTheme"
			:footer-theme="footerTheme"
		>
			<div class="row" style="padding: 1.625rem 0;">
				<div class="small-12 columns"><h1>Lorem ipsum</h1></div>
			</div>
		</www-page-minimal>
	`,
});

export const Themed = Default.bind({});
Themed.args = {
	headerTheme: lightHeader,
	footerTheme: lightFooter
};
