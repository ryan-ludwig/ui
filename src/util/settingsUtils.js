import { isWithinRange } from 'date-fns';
import _get from 'lodash/get';

/**
 * @param {object} data
 * @param {string} key
 * @returns {boolean|null}
 */
export function readBoolSetting(data, key) {
	const val = _get(data, key);
	if (val === 'true') return true;
	if (val === 'false') return false;
	return null;
}

/**
 * @param {object} data
 * @param {string} key
 * @returns {date|null}
 */
export function readDateSetting(data, key) {
	const val = _get(data, key);
	return val ? new Date(val) : null;
}

/**
 * @param {object} data
 * @param {string} key
 * @returns {object|null}
 */
export function readJSONSetting(data, key) {
	try {
		return JSON.parse(JSON.parse(_get(data, key)));
	} catch (e) {
		return null;
	}
}

/**
 * @param {object} data
 * @param {string} enabledKey
 * @param {string} startTimeKey
 * @param {string} endTimeKey
 * @returns {boolean}
 */
export function settingEnabled(data, enabledKey, startTimeKey, endTimeKey) {
	const enabled = readBoolSetting(data, enabledKey);
	const startTime = readDateSetting(data, startTimeKey);
	const endTime = readDateSetting(data, endTimeKey);
	return enabled && isWithinRange(new Date(), startTime, endTime);
}
