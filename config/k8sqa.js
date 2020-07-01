var merge = require('webpack-merge')
var qa  = require('./qa.js')

module.exports = merge(qa, {
	app: {
		publicPath: 'https://www-qa-kiva-org.freetls.fastly.net/',
	},
	server: {
		memcachedServers: 'marketplace-k8s-ui-qa.knmtma.cfg.usw2.cache.amazonaws.com:11211',
		enableDDTrace: true,
		disableCluster: true,
	}
})
