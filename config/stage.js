var merge = require('webpack-merge')
var base = require('./index.js')

module.exports = merge(base, {
	app: {
		host: 'www.stage.kiva.org',
		publicPath: 'https://www-stage-kiva-org.freetls.fastly.net/ui/',
		graphqlUri: 'https://marketplace-api-stage.dk1.kiva.org/graphql',
		enablePerimeterx: false,
		perimeterxAppId: '####',
		enableAnalytics: true,
		enableGTM: true,
		googleTagmanagerId: 'GTM-K6HR28',
		enableGA: true,
		gaId: 'UA-11686022-5',
		enableSnowplow: true,
		snowplowUri: 'events.fivetran.com/snowplow/v5qt54ocr2nm',
		enableFB: true,
		fbApplicationId: '2260431077572912',
		fbPixelId: '',
		fbOgNameSpace: 'stage-kiva',
		enableSentry: true,
		sentryURI: 'https://7ce141b23c4a4e6091c206d08442f0e9@sentry.io/1201287',
		algoliaConfig: {
			enableAA: false,
			group: 'stage',
			appId: 'testingZ9YK0WNQ85',
			apiKey: '28aaa1d56e6a1688f13f6b41da0f27a5',
			defaultIndex: 'stage_fundraising_popularity',
		},
		auth0: {
			loginRedirectUrls: {
				iHNp5rV3XxaozU7B50oXpNye6RCAE5OD: 'https://admin.stage.kiva.org/admin/login',
				fNYmJqpKX6mWiz1Evk8b1eqbM9KoeQ45: 'https://partners.stage.kiva.org/pa2/login/login',
				'5NP78k662QLODpkk4VzMyKxP0QWTcVmB': 'https://www.stage.kiva.org/authenticate?authLevel=recent',
				Ch7rwGop9lctGpm5KfEl6VTVMrqKoWZ4: 'https://www.stage.kiva.org/ui-login?force=true',
				pK7XVUBouUjPEFm9bz5MN7sjU5HACqqe: 'https://www.stage.kiva.org/ui-login?force=true',
			},
			enable: true,
			apiAudience: 'https://api.stage.kivaws.org/graphql',
			browserClientID: 'pK7XVUBouUjPEFm9bz5MN7sjU5HACqqe',
			serverClientID: 'Ch7rwGop9lctGpm5KfEl6VTVMrqKoWZ4',
			browserCallbackUri: 'https://www.stage.kiva.org/process-browser-auth',
			serverCallbackUri: 'https://www.stage.kiva.org/process-ssr-auth',
			domain: 'login.stage.kiva.org',
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
		graphqlUri: 'https://marketplace-api-stage.dk1.kiva.org/graphql',
		sessionUri: 'https://www.stage.kiva.org/start-ui-session',
		memcachedEnabled: true,
		memcachedServers: 'stage-memcached-01:11211',
	}
})
