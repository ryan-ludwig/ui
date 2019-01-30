const express = require('express');
const session = require('express-session');
const MemcachedStore = require('connect-memjs')(session);

module.exports = function sessionRouter(config = {}) {
	const router = express.Router();

	const secret = process.env.UI_SESSION_SECRET;
	// If we don't have a secret, don't start the session
	if (!secret) return router;

	const sessionOptions = {
		secret,
		name: 'ui',
		cookie: {
			httpOnly: true,
			secure: false,
			maxAge: 86400,
		},
		resave: false,
		saveUninitialized: true,
	};

	if (config.memcachedEnabled) {
		sessionOptions.store = new MemcachedStore({
			servers: [config.memcachedServers]
		});
	}

	router.use(session(sessionOptions));
	return router;
};