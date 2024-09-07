/**
 * The reporting API.
 *  
 * (C) 2024 Tekmonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */

const dblayer = require(`${LTTL_CONSTANTS.LIBDIR}/dblayer.js`);

exports.doService = async jsonReq => {
	if (!validateRequest(jsonReq)) {LOG.error("Validation failure."); return CONSTANTS.FALSE_RESULT;}
	
	LOG.debug(`Got report request for table ${jsonReq.table} with WHERE condition ${jsonReq.where}`);
	const rows = await dblayer.selectTableWhere(jsonReq.table, jsonReq.where);
	if (!rows) LOG.error(`DB error for report for table ${jsonReq.table} with WHERE condition ${jsonReq.where}`);
	return {result: rows?true:false, rows};
}

const validateRequest = jsonReq => (jsonReq && jsonReq.table && jsonReq.where);
