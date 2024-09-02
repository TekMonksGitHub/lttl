/**
 * Initializes the application.
 * (C) TekMonks. All rights reserved.
 */

exports.initSync = _appName => {
    global.LTTL_CONSTANTS = require(`${__dirname}/constants.js`);
    const dblayer = require(`${LTTL_CONSTANTS.LIBDIR}/dblayer.js`);
    dblayer.initDBAsync();
}