import {Opplysning, VedleggGruppe} from "./opplysningerTypes";
import {
    opplysningSpec,
    sortertSpecGammeltFormat,
    VedleggFrontendsMinusEtParTingSomTrengerAvklaring,
} from "./opplysningerConfig";
import {logError} from "../../../nav-soknad/utils/loggerUtils";
import {VedleggFrontend, VedleggFrontendType} from "../../../generated/model";

export const getOpplysningerUrl = (behandlingsId: string) => `soknader/${behandlingsId}/okonomiskeOpplysninger`;

export const updateSortertOpplysning = (opplysninger: VedleggFrontend[], opplysningUpdated: VedleggFrontend) => {
    const index = opplysninger.findIndex((o) => o.type === opplysningUpdated.type);
    opplysninger[index] = opplysningUpdated;
    return opplysninger;
};

export const transformToBackendOpplysning = ({
    type,
    gruppe,
    rader,
    vedleggStatus,
    filer,
}: VedleggFrontend): VedleggFrontend => ({
    type,
    gruppe,
    rader,
    vedleggStatus,
    filer,
});

export const Gruppetittel: Record<VedleggGruppe, string> = {
    statsborgerskap: "opplysninger.statsborgerskap",
    arbeid: "opplysninger.arbeid",
    familie: "opplysninger.familiesituasjon",
    bosituasjon: "opplysninger.bosituasjon",
    inntekt: "opplysninger.inntekt",
    utgifter: "opplysninger.utgifter",
    "generelle vedlegg": "opplysninger.generell",
    "andre utgifter": "opplysninger.ekstrainfo",
    ukjent: "opplysninger.ukjent",
};

export const getOpplysningByType = (opplysninger: Opplysning[], opplysningType: VedleggFrontendType) =>
    opplysninger.find(({type}) => type === opplysningType);

export const getSortertListeAvOpplysninger = ({
    okonomiskeOpplysninger,
    slettedeVedlegg,
}: VedleggFrontendsMinusEtParTingSomTrengerAvklaring): Opplysning[] => {
    const current = okonomiskeOpplysninger.map((opplysning): Opplysning => ({...opplysning}));
    const deleted = slettedeVedlegg.map((opplysning): Opplysning => ({...opplysning, slettet: true}));
    return [...current, ...deleted].sort(opplysningerSortFn);
};

export const getSpcForOpplysning = (opplysningType: VedleggFrontendType) => {
    const spec = sortertSpecGammeltFormat.find(({type}) => type === opplysningType);

    if (!spec) logError(`Spc ikke funnet for opplysning med type: "${opplysningType}"`);

    return spec!;
};

export const opplysningerSortFn = (a: Opplysning, b: Opplysning) =>
    opplysningSpec[a.type].sortKey - opplysningSpec[b.type].sortKey;
