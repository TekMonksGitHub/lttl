/**
 * The main entry point.
 *  
 * (C) 2024 TekMonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */

import {redirect} from "./redirect.mjs";
import {router} from "/framework/js/router.mjs";
import {session} from "/framework/js/session.mjs";
import {securityguard} from "/framework/js/securityguard.mjs";
import {apimanager as apiman} from "/framework/js/apimanager.mjs";
import {APP_CONSTANTS as AUTO_APP_CONSTANTS} from "./constants.mjs";

const init = async hostname => {
	window.monkshu_env.apps[AUTO_APP_CONSTANTS.APP_NAME] = {};
	const mustache = await router.getMustache();
	window.APP_CONSTANTS = JSON.parse(mustache.render(JSON.stringify(AUTO_APP_CONSTANTS), {hostname}));

	window.LOG = (await import ("/framework/js/log.mjs")).LOG;
	if (!session.get($$.MONKSHU_CONSTANTS.LANG_ID.LANG_ID)) session.set($$.MONKSHU_CONSTANTS.LANG_ID.LANG_ID, "en");
	securityguard.setPermissionsMap(APP_CONSTANTS.PERMISSIONS_MAP);
	securityguard.setCurrentRole(securityguard.getCurrentRole() || APP_CONSTANTS.GUEST_ROLE);
	apiman.registerAPIKeys(APP_CONSTANTS.API_KEYS, APP_CONSTANTS.KEY_HEADER); 
	router.addOnLoadPageData("*", async (data, _url) => data.APP_CONSTANTS = window.APP_CONSTANTS); 
}

const main = async _ => {
	let location = window.location.href;
	const id = new URL(location).searchParams.get("id");
	if (id && redirect.redirectToID(id)) return;
	if (!router.isInHistory(location) || !session.get(APP_CONSTANTS.USERID))
		try {await router.loadPage(APP_CONSTANTS.START_HTML)} catch (err) {window.location="/framework/error.html";}
	else if (router.decodeURL(location) == session.get($$.MONKSHU_CONSTANTS.PAGE_URL)) router.reload();
	else router.loadPage(location);
}

export const application = {init, main};