const fs = require('fs');
const path = require('path');
const cookie = require('cookie');
const { createBundleRenderer } = require('vue-server-renderer');
const config = require('../config/dev-vm');

const { graphqlUri } = config.server;
const isProd = process.env.NODE_ENV === 'production';

function handleError(err, req, res) {
	if (err.url) {
		res.redirect(err.url);
	} else if (err.code === 404) {
		res.status(404).send('404 | Page Not Found');
	} else {
		// Render Error Page or Redirect
		res.status(500).send('500 | Internal Server Error');
		console.error(`error during render : ${req.url}`);
		console.error(err.stack);
	}
}

module.exports = function createMiddleware({ serverBundle, clientManifest }) {
	const template = fs.readFileSync(path.resolve(__dirname, 'index.template.html'), 'utf-8');

	return function middleware(req, res) {
		console.log('---------> rendering server');
		const s = Date.now();

		const renderer = createBundleRenderer(serverBundle, {
			template,
			clientManifest,
			runInNewContext: false,
		});

		const cookies = cookie.parse(req.headers.cookie);

		const context = {
			title: 'Kiva.org', // default title
			url: req.url,
			graphqlUri,
			cookies,
		};

		res.setHeader('Content-Type', 'text/html');

		renderer.renderToString(context).then(html => {
			res.send(html);
			if (!isProd) {
				console.log(`whole request: ${Date.now() - s}ms`);
			}
		}).catch(err => handleError(err, req, res));
	};
};
