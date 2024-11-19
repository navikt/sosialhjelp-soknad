import {isSupportedLanguage} from "./lib/i18n/common.ts";
import {BASE_PATH} from "./lib/constants.ts";

/**
 * Adapter for å håndtere i18n-path-prefix i BrowserRouter.
 *
 * Ifbm overgang til SSR er det ønskelig å ha locale i URLen.
 * Denne adapteren tilpasser BrowserRouter dette ved å forlenge basename med locale,
 * sånn at BrowserRouter kan ignorere locale-prefixet.
 */
export const getPathPrefixIncludingLocale = (): [string, string] => {
    const {pathname} = window.location;
    const pathMinusBasepath = pathname.startsWith(BASE_PATH) ? pathname.slice(BASE_PATH.length) : pathname;
    const locale = getFirstSegmentOfPath(pathMinusBasepath);

    // If there's a locale in the URL, we slice it off the path,
    // but add it to the basename for BrowserRouter.
    if (isSupportedLanguage(locale)) {
        const pathMinusLocaleToo = pathMinusBasepath.slice(locale.length + 1);

        return [`${BASE_PATH}/${locale}`, pathMinusLocaleToo];
    }

    // Return the original BASE_PATH if no locale is found
    return [BASE_PATH, pathMinusBasepath];
};

// Gets the first segment of a path, ignoring leading/trailing slashes
const getFirstSegmentOfPath = (relativePath: string) => relativePath.split("/").filter(Boolean)[0];
