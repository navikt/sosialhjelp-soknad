import {routing} from "../i18n/routing.ts";
import {formats} from "../i18n/request.ts";
import messages from "../../messages/en.json";

declare module "next-intl" {
    interface AppConfig {
        Locale: (typeof routing.locales)[number];
        Messages: typeof messages;
        Formats: typeof formats;
    }
}
