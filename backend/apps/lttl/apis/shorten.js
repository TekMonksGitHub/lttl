/**
 * The shorten API.
 *  
 * (C) 2024 Tekmonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */


const dblayer = require(`${LTTL_CONSTANTS.LIBDIR}/dblayer.js`);
const httpClient = require(`${CONSTANTS.LIBDIR}/httpClient.js`);
const recaptchaconf = require(`${LTTL_CONSTANTS.CONFDIR}/recaptcha.json`);

const SHORTEN_API = "shortenapi", SHORTEN_WEB = "shorten";

exports.doService = async (jsonReq, _servObject, _headers, apiurl, _apiconf) => {
	if (!validateRequest(jsonReq)) {LOG.error("Validation failure."); return CONSTANTS.FALSE_RESULT;}

	try {jsonReq.url = new URL(jsonReq.url).href} catch (err) {
		LOG.error(`Adding ${jsonReq.url} failed due to bad URL, parsing error ${err}.`);
		return CONSTANTS.FALSE_RESULT;
	}

	if (apiurl.endsWith(SHORTEN_WEB)) {	// direct api calls to ignore recaptcha, but validate for web UI
		const recaptchaResponse = await httpClient.fetch(recaptchaconf.url, {
			method: recaptchaconf.method, 
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: `secret=${recaptchaconf.secret}&response=${jsonReq.recaptchaToken||""}`});
		let recaptchaResponseObject = {success: false}; try {
			if (recaptchaResponse.ok) recaptchaResponseObject = recaptchaResponse.json();
		} catch (err) {};
		if (!recaptchaResponseObject.success) {
			LOG.error(`Adding ${jsonReq.url} failed due to recaptcha challenge failure.`);
			return {...CONSTANTS.FALSE_RESULT, reason: "recaptcha"};
		}
	}
	
	LOG.debug("Got shorten request for URL: " + jsonReq.url);

	if (apiurl.endsWith(SHORTEN_WEB) || (apiurl.endsWith(SHORTEN_API) && (!jsonReq.forcenew))) {	// api can force new IDs
		const existingID = await dblayer.getIDForExistingURL(jsonReq.url);
		if (existingID) return {result: true, id: existingID};	// save DB space
	}
	
	const ts = Date.now() + Math.round(Math.random()*100000);
	const bytes = new ArrayBuffer(4); new DataView(bytes).setUint32(0, ts);
	const id = Buffer.from(bytes).toString("base64url");
	const result = await dblayer.addURL(id, jsonReq.url);
	if (result) LOG.info(`Added ${id} -> ${jsonReq.url}`); else LOG.error(`Adding ${jsonReq.url} failed. ID generated was ${id}.`);
	return {result, id};
}

const validateRequest = jsonReq => (jsonReq && jsonReq.url);
