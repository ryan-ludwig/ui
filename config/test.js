var merge = require('webpack-merge')
var base = require('./index.js')

module.exports = merge(base, {
	app: {
		host: 'www.test.kiva.org',
		publicPath: 'https://www-test-kiva-org.freetls.fastly.net/ui/',
		graphqlUri: 'https://marketplace-api-test.dk1.kiva.org/graphql',
		enablePerimeterx: true,
		perimeterxAppId: 'PX5u4Lz98O',
		enableAnalytics: true,
		enableGTM: true,
		googleTagmanagerId: 'GTM-PXFRMT',
		enableGA: true,
		gaId: 'UA-11686022-3',
		gaAlternateId: 'UA-11686022-6',
		enableSnowplow: true,
		snowplowUri: 'events.fivetran.com/snowplow/v5qt54ocr2nm',
		enableFB: true,
		fbApplicationId: '364044572460',
		fbPixelId: '108245819986414',
		fbOgNameSpace: 'test-kiva',
		enableSentry: true,
		sentryURI: 'https://7ce141b23c4a4e6091c206d08442f0e9@sentry.io/1201287',
		algoliaConfig: {
			enableAA: true,
			group: 'test',
			appId: 'testingZ9YK0WNQ85',
			apiKey: '28aaa1d56e6a1688f13f6b41da0f27a5',
			defaultIndex: 'test_fundraising_popularity',
		},
		auth0: {
			loginRedirectUrls: {
				PbZJxDWw2uO1j4K6lzC9Yjd5v6yGfLUE: 'https://admin.test.kiva.org/login',
				Z23BzhhZr3cNhHvu62tQPrhzpsmqyDkD: 'https://partners.test.kiva.org/login',
				OIAxYkR4698ovGuJA0aXE8Hp1tPYaz45: 'https://www.test.kiva.org/authenticate',
				m0gkCWRIS0kiu2q0oFNRijUVPgY1MjCn: 'https://www.test.kiva.org/ui-login',
				DgnxRxp8t0ei27KpwCkQDj6hMrHPheFr: 'https://www.test.kiva.org/ui-login',
			},
			enable: true,
			apiAudience: 'https://api.test.kivaws.org/graphql',
			browserClientID: 'DgnxRxp8t0ei27KpwCkQDj6hMrHPheFr',
			serverClientID: 'm0gkCWRIS0kiu2q0oFNRijUVPgY1MjCn',
			browserCallbackUri: 'https://www.test.kiva.org/process-browser-auth',
			serverCallbackUri: 'https://www.test.kiva.org/process-ssr-auth',
			domain: 'login.test.kiva.org',
		},
		intercom: {
			enable: true,
		},
		paypal : {
			url: 'www.sandbox.paypal.com',
			environment: 'sandbox'
		},
	},
	server: {
		graphqlUri: 'https://marketplace-api-test.dk1.kiva.org/graphql',
		sessionUri: 'https://www.test.kiva.org/start-ui-session',
		memcachedEnabled: true,
		memcachedServers: 'test-memcached-01:11211',
	}
})
