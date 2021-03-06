var merge = require('webpack-merge')
var base = require('./index.js')

module.exports = merge(base, {
	app: {
		host: 'www.qa.kiva.org',
		publicPath: 'https://www-qa-kiva-org.freetls.fastly.net/ui/',
		graphqlUri: 'https://marketplace-api-qa.dk1.kiva.org/graphql',
		enablePerimeterx: false,
		perimeterxAppId: '####',
		enableAnalytics: true,
		enableGTM: true,
		googleTagmanagerId: 'GTM-WXLS9B',
		enableGA: true,
		gaId: 'UA-11686022-4',
		gaAlternateId: 'UA-11686022-8',
		enableSnowplow: true,
		snowplowUri: 'events.fivetran.com/snowplow/v5qt54ocr2nm',
		enableFB: true,
		fbApplicationId: '370252743225',
		fbPixelId: '108245819986414',
		fbOgNameSpace: 'qa-kiva',
		enableSentry: false,
		sentryURI: '',
		algoliaConfig: {
			enableAA: false,
			group: 'qa',
			appId: 'testingZ9YK0WNQ85',
			apiKey: '28aaa1d56e6a1688f13f6b41da0f27a5',
			defaultIndex: 'qa_fundraising_popularity',
		},
		auth0: {
			loginRedirectUrls: {
				Sjw8ylxL4HZT5HzOtoGZMqoP5FQbTmPA: 'https://admin.qa.kiva.org/admin/login',
				CeQC6x4yEVuzjgZ8ohQwBvZtAdHMFCTD: 'https://partners.qa.kiva.org/pa2/login/login',
				DI2eKv1v4S7Ms3ZtOej2xyeULKfXYd47: 'https://www.qa.kiva.org/authenticate?authLevel=recent',
				tZuDW6xKBP5WYgP8FEwNsl41T4fhjWhF: 'https://www.qa.kiva.org/ui-login?force=true',
				D4nisXFEuifQ8Am1WoJJpuneCBTBle3Q: 'https://www.qa.kiva.org/ui-login?force=true',
			},
			enable: true,
			apiAudience: 'https://api.qa.kivaws.org/graphql',
			browserClientID: 'D4nisXFEuifQ8Am1WoJJpuneCBTBle3Q',
			serverClientID: 'tZuDW6xKBP5WYgP8FEwNsl41T4fhjWhF',
			browserCallbackUri: 'https://www.qa.kiva.org/process-browser-auth',
			serverCallbackUri: 'https://www.qa.kiva.org/process-ssr-auth',
			domain: 'login.qa.kiva.org',
		},
		intercom: {
			enable: false,
		},
		paypal : {
			url: 'www.sandbox.paypal.com',
			environment: 'sandbox'
		},
	},
	server: {
		graphqlUri: 'https://marketplace-api-qa.dk1.kiva.org/graphql',
		sessionUri: 'https://www.qa.kiva.org/start-ui-session',
		memcachedEnabled: true,
		memcachedServers: 'qa-memcached-01:11211,qa-memcached-02:11211',
	}
})
