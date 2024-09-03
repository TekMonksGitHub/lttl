/**
 * Start module.
 * 
 * (C) 2024 TekMonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */
 
import {apimanager as apiman} from "/framework/js/apimanager.mjs";

const API_SHORTEN = `${APP_CONSTANTS.API_PATH}/shorten`;

async function shorten(urlInput, shortenedurlInput) {
	let url = urlInput.value;
	try {new URL(url)} catch (err) {
		if (url.indexOf(":") == -1) url = "http://"+url;	// try fixing the URL a bit if possible
		try {new URL(url)} catch (err) {
			LOG.error(`Shortening the URL ${url} failed due to bad URL. Error was ${err}.`);
			shortenedurlInput.value = "Bad URL or error";
			return;
		}
		urlInput.value = url;
	}

	const req = {url}, result = await apiman.rest(API_SHORTEN, "POST", req);
    if (!result?.result) {
		LOG.error(`Shortening failed for ${url} due to internal error. False or null response.`);
		shortenedurlInput.value = "Bad URL or error";
		return;
	}
	
	const redirectURL = `${APP_CONSTANTS.FRONTEND}/${result.id}`;
	shortenedurlInput.value = redirectURL;
}

export const start = {shorten};