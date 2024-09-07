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

/** @return URL for the given ID */
exports.getURL = async id => {
	const query = "SELECT url FROM urls WHERE id=?";
	const url = await db.getQuery(query, [id]);
	if ((!url) || (!url.length)) return null;
    return _flattenArray(url, "url")[0];
}

/** @return ID for the given URL if it exists, else null */
exports.getIDForExistingURL = async url => {
	const query = "SELECT id FROM urls WHERE url=? COLLATE NOCASE";
	const id = await db.getQuery(query, [url]);
	if ((!id) || (!id.length)) return null;
    return _flattenArray(id, "id")[0];
}

/** Add (id, url) to the DB */
exports.addURL = async (id, url) => {
    const cmd = "INSERT INTO urls (id, url) values (?,?)";
	const result = await db.runCmd(cmd, [id, url]); 
	return result;
}

/** Remove URL from DB given an ID */
exports.rmURL = async id => {
    const query = "DELETE FROM urls WHERE id=?";
	const result = await db.runCmd(query, [id]); 
	return result;
}

/** Add access to DB given its timestamp, id, url, clientip, agentstr */
exports.addAccess  = async (timestamp, id, url, clientip, agentstr) => {
	const cmd = "INSERT INTO access (timestamp, id, url, clientip, agentstr) values (?,?,?,?,?)";
	const result = await db.runCmd(cmd, [timestamp, id, url, clientip, agentstr]); 
	return result;
}

/** Runs a select query on the given table with the given WHERE clause */
exports.selectTableWhere = async (table, where) => {
	const query = `SELECT * from ${table} WHERE ${where}`;
	const result = await db.getQuery(query); 
	return result;
}

function _flattenArray(results, columnName, functionToCall) { 
	if (!results) return [];
	const retArray = []; for (const result of results) retArray.push(
		functionToCall?functionToCall(result[columnName]):result[columnName]); return retArray;
}