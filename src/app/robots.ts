import type {MetadataRoute} from "next";
import {useConfigFeatureFlags} from "../lib/config.ts";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: useConfigFeatureFlags().publicFacingTestVersion
            ? [
                  {
                      userAgent: "*",
                      disallow: "/",
                  },
              ]
            : [
                  {
                      userAgent: "*",
                      allow: "/",
                      disallow: "/skjema/",
                  },
              ],
        sitemap: "https://nav.no/sosialhjelp/soknad/sitemap.xml",
    };
}
