import type {MetadataRoute} from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://nav.no/sosialhjelp/soknad",
            lastModified: new Date(),
            changeFrequency: "daily",
            alternates: {
                languages: {
                    nb: "https://nav.no/sosialhjelp/soknad",
                    nn: "https://nav.no/sosialhjelp/soknad/nn",
                    en: "https://nav.no/sosialhjelp/soknad/en",
                },
            },
        },
    ];
}
