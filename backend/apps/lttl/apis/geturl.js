/**
 * The read API.
 *  
 * (C) 2024 Tekmonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */

const dblayer = require(`${LTTL_CONSTANTS.LIBDIR}/dblayer.js`);

exports.doService = async jsonReq => {
	if (!validateRequest(jsonReq)) {LOG.error("Validation failure."); return CONSTANTS.FALSE_RESULT;}
	
	LOG.debug("Got URL fetch request for ID: " + jsonReq.id);
	const url = await dblayer.getURL(jsonReq.id);
	if (url) LOG.info(`Got ${jsonReq.id} -> ${url}`); else LOG.error(`No URL found for ID ${jsonReq.id}.`);
	return {result: url?true:false, url};
}

const validateRequest = jsonReq => (jsonReq && jsonReq.id);
