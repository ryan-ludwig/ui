import _toPairs from 'lodash/toPairs';
import Raven from 'raven-js';

const simpleObjectToString = simpleObject => _toPairs(simpleObject)
	.map(([key, value]) => `${key}:${value}`)
	.join('; ');

export default (error, queryType) => {
	const newError = new Error(`readQuery failed: ${simpleObjectToString(error)}`);
	console.error(newError);
	Raven.captureException(newError, {
		tags: {
			query_error_type: queryType || 'undefined_query_error_type',
		}
	});
};
