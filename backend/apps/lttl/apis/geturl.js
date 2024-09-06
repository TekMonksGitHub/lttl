/**
 * The read API.
 *  
 * (C) 2024 Tekmonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */

const dblayer = require(`${LTTL_CONSTANTS.LIBDIR}/dblayer.js`);

exports.doService = async (jsonReq, servObject, _headers, _apiurl, _apiconf) => {
	if (!validateRequest(jsonReq)) {LOG.error("Validation failure."); return CONSTANTS.FALSE_RESULT;}
	
	LOG.debug("Got URL fetch request for ID: " + jsonReq.id);
	const url = await dblayer.getURL(jsonReq.id);
	_logAccess(jsonReq.id, url, servObject);
	if (url) LOG.info(`Got ${jsonReq.id} -> ${url}`); else LOG.error(`No URL found for ID ${jsonReq.id}.`);
	return {result: url?true:false, url};
}

async function _logAccess(id, url, servObject) {
	const timestamp = Date.now(), clientip = servObject.env.remoteHost, agentstr = servObject.env.remoteAgent;
	try {
		const updateResult = await dblayer.addAccess(timestamp, id, url, clientip, agentstr);
		if (!updateResult) LOG.error(`DB error adding access for ${id} ${url} for remote IP ${clientip}`);
	} catch (err) { LOG.error(`Error adding access for ${id} ${url} for remote IP ${clientip} due to error ${err}`); }
}

const validateRequest = jsonReq => (jsonReq && jsonReq.id);
