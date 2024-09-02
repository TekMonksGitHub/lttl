/**
 * The shorten API.
 *  
 * (C) 2024 Tekmonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */

const dblayer = require(`${LTTL_CONSTANTS.LIBDIR}/dblayer.js`);

exports.doService = async jsonReq => {
	if (!validateRequest(jsonReq)) {LOG.error("Validation failure."); return CONSTANTS.FALSE_RESULT;}
	
	LOG.debug("Got shorten request for URL: " + jsonReq.url);

	const existingID = await dblayer.getIDForExistingURL(jsonReq.url);
	if (existingID) return {result: true, id: existingID};	// save DB space

	const ts = Date.now() + Math.round(Math.random()*100000);
	const bytes = new ArrayBuffer(4); new DataView(bytes).setUint32(0, ts);
	const id = Buffer.from(bytes).toString("base64url");
	const result = await dblayer.addURL(id, jsonReq.url);
	if (result) LOG.info(`Added ${id} -> ${jsonReq.url}`); else LOG.error(`Adding ${jsonReq.url} failed. ID generated was ${id}.`);
	return {result, id};
}

const validateRequest = jsonReq => (jsonReq && jsonReq.url);
