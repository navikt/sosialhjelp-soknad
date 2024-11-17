import "i18next";

import {resources} from "../lib/i18n/resources.ts";
import {defaultNS} from "../lib/i18n/common.ts";

// Added January 2023 by Tore Sinding Bekkedal
// For compatibility with legacy design components, we make t() return string,
// and not string | null. Might be irrelevant at some future point.
// See also src/i18n.tsx
declare module "i18next" {
    interface CustomTypeOptions {
        //returnNull: false;
        defaultNS: typeof defaultNS;
        resources: (typeof resources)["nb"];
    }
}
