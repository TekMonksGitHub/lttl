/**
 * Redirect module.
 * 
 * (C) 2024 TekMonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */

import {apimanager as apiman} from "/framework/js/apimanager.mjs";


async function redirectToID(id) {
    const API_GETURL = `${APP_CONSTANTS.API_PATH}/geturl`;
    const req = {id}, result = await apiman.rest(API_GETURL, "GET", req);
    if (result?.result) {window.location.replace(result.url); return true;}
    else return false;
}

export const redirect = {redirectToID};