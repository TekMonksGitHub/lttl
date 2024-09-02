/** 
 * App constants.
 * 
 * (C) 2015 TekMonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */

const path = require("path");

const APPROOT = path.resolve(`${__dirname}/../`);
const LIBDIR = path.resolve(`${APPROOT}/lib`);
const DBDIR = path.resolve(`${APPROOT}/db`);

module.exports = {APPROOT, LIBDIR, DBDIR};