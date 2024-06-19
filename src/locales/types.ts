import {OpplysningInputType} from "../lib/opplysninger";

type DokumentRadStrenger = {label: string};

type ObsoleteInputType =
    | "sum"
    | "bruttolonn"
    | "nettolonn"
    | "betaler"
    | "mottar"
    | "saldo"
    | "sisteregning"
    | "utbetaling"
    | "permnd"
    | "sistemnd"
    | "type"
    | "utgift";

type DokumentasjonRadObsoleteTypes = {[K in ObsoleteInputType]?: DokumentRadStrenger};
type DokumentasjonRadTypes = {[K in OpplysningInputType]?: DokumentRadStrenger};

type DokumentasjonTextFields = {
    sporsmal: string;
    undertekst?: string;
    leggtil?: string;
    slettet?: string;
    dokumentBeskrivelse: string;
    dokumentInfo?: string;
};

export type DokumentasjonTexts = DokumentasjonRadTypes & DokumentasjonRadObsoleteTypes & DokumentasjonTextFields;

/*
Ny versjon for bruk med typesikker i18n

export const ensureMandatoryStringsPresent = (
    opplysningType: VedleggFrontendType,
    dokumentTekster: DokumentasjonTexts
) => {
    const {numRows} = opplysningSpec[opplysningType];

    if (!dokumentTekster.sporsmal) throw new Error(`Missing translation for ${opplysningType}.sporsmal`);

    if (!dokumentTekster.dokumentBeskrivelse)
        throw new Error(`Missing translation for ${opplysningType}.dokumentBeskrivelse`);

    if (numRows === "flere" && !dokumentTekster.leggtil)
        throw new Error(`Missing translation for ${opplysningType}.leggtil`);
};

export const useOpplysningTekster = (opplysningType: VedleggFrontendType): DokumentasjonTexts => {
    const {t} = useTranslation("dokumentasjon");

    const dokumentTekster = t(opplysningType, {returnObjects: true}) as DokumentStrenger;
    ensureMandatoryStringsPresent(opplysningType, dokumentTekster);

    return dokumentTekster;
};

 */
