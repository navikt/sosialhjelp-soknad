const OBSOLETE_ROOT_KEYS = [
    "json",
    "vedleggtekst",
    "Dagpenger",
    "aap",
    "datepicker",
    "dato",
    "enhet",
    "maned",
    "sendEttersendelse",
    "soknadaap",
    "soknadtilleggsstonader",
    "tiltakspenger",
    "dialoginnsending",
    "timeout",
    "timeoutbox",
    "bilstonad",
    "video",
    "soknadinnsending",
    "sendsoknad",
    "fritekst",
    "regex",
];

export const deleteObsoleteRootKeys = <T extends object>(obj: T): T => {
    OBSOLETE_ROOT_KEYS.map((key) => delete obj[key as keyof T]);
    return obj;
};
