// Note: This value is duplicated in server.mjs because the imports are weird
export const BASE_PATH = "/sosialhjelp/soknad" as const;
export const LINK_PAGE_PATH = `${BASE_PATH}/link` as const;
export const ENABLE_DEBUG_I18N = false;
export const DIGISOS_LANGUAGE_STORAGE_KEY = "digisos-language" as const;
export const XSRF_COOKIE_NAME = "XSRF-TOKEN-SOKNAD-API" as const;
export const XSRF_HEADER_NAME = "X-XSRF-TOKEN" as const;
