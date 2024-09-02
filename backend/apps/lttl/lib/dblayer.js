/**
 * Database layer for the LTTL app.
 * 
 * (C) 2024 TekMonks. All rights reserved.
 * See enclosed LICENSE file.
 */

const path = require("path");
const DB_PATH = path.resolve(`${LTTL_CONSTANTS.DBDIR}/lttl.db`);
const DB_CREATION_SQLS = require(`${LTTL_CONSTANTS.DBDIR}/lttl_dbschema.json`);
const db = require(`${CONSTANTS.LIBDIR}/db.js`).getDBDriver("sqlite", DB_PATH, DB_CREATION_SQLS);

exports.initDBAsync = async _ => await db.init();

exports.getURL = async id => {
	const query = "SELECT url FROM urls WHERE id=?";
	const url = await db.getQuery(query, [id]);
	if ((!url) || (!url.length)) return null;
    return _flattenArray(url, "url")[0];
}

exports.getIDForExistingURL = async url => {
	const query = "SELECT id FROM urls WHERE url=? COLLATE NOCASE";
	const id = await db.getQuery(query, [url]);
	if ((!id) || (!id.length)) return null;
    return _flattenArray(id, "id")[0];
}

exports.addURL = async (id, url) => {
    const query = "INSERT INTO urls (id, url) values (?,?)";
	const result = await db.runCmd(query, [id, url]); 
	return result;
}

exports.rmURL = async id => {
    const query = "DELETE FROM urls WHERE id=?";
	const result = await db.runCmd(query, [id]); 
	return result;
}

function _flattenArray(results, columnName, functionToCall) { 
	if (!results) return [];
	const retArray = []; for (const result of results) retArray.push(
		functionToCall?functionToCall(result[columnName]):result[columnName]); return retArray;
}