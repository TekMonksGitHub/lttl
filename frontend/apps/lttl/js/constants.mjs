/**
 * (C) 2015 TekMonks. All rights reserved.
 * License: See enclosed LICENSE file.
 */
const FRONTEND = "https://{{{hostname}}}";
const BACKEND = "https://{{{hostname}}}:9090";
const APP_NAME = $$.getRootAppName();
const APP_PATH = `${FRONTEND}/apps/${APP_NAME}`;
const API_PATH = `${BACKEND}/apps/${APP_NAME}`;

export const APP_CONSTANTS = {
    FRONTEND, BACKEND, APP_PATH, APP_NAME, API_PATH,
    START_HTML: APP_PATH+"/start.html",

    API_KEYS: {"*":"UFEY4GpNDgn6aPLYDXjVRrLzpt8H7Fq60wHK1hJ6DudcYXyj"},
    KEY_HEADER: "X-API-Key",

    MOBILE_MEDIA_QUERY_START: "<style>@media only screen and (max-width: 959px) {",
    MOBILE_MEDIA_QUERY_END: "}</style>",
    MOBILE_MEDIA_QUERY_LANDSCAPE_START: "<style>@media only screen and (max-width: 959px) and (orientation: landscape) {",
    MOBILE_MEDIA_QUERY_LANDSCAPE_END: "}</style>",
    MOBILE_MEDIA_QUERY_PORTRAIT_START: "<style>@media only screen and (max-width: 959px) and (orientation: portrait) {",
    MOBILE_MEDIA_QUERY_PORTRAIT_END: "}</style>",

    USERID: "id",
    USER_ROLE: "user",
    GUEST_ROLE: "guest",
    PERMISSIONS_MAP: {
        user:[APP_PATH+"/start.html", $$.MONKSHU_CONSTANTS.ERROR_THTML], 
        guest:[APP_PATH+"/start.html", $$.MONKSHU_CONSTANTS.ERROR_HTML]
    }
}