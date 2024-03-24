import {updateBegrunnelse} from "../../../generated/begrunnelse-ressurs/begrunnelse-ressurs";
import {updateUtdanning} from "../../../generated/utdanning-ressurs/utdanning-ressurs";
import {
    hentForsorgerplikt,
    updateForsorgerplikt,
} from "../../../generated/forsorgerplikt-ressurs/forsorgerplikt-ressurs";
import {updateBosituasjon} from "../../../generated/bosituasjon-ressurs/bosituasjon-ressurs";
import {putSkatteetatenSamtykke} from "../../../generated/skattbar-inntekt-ressurs/skattbar-inntekt-ressurs";
import {updateBostotte, updateSamtykke1} from "../../../generated/bostotte-ressurs/bostotte-ressurs";
import {updateStudielan} from "../../../generated/studielan-ressurs/studielan-ressurs";
import {updateUtbetalinger} from "../../../generated/utbetaling-ressurs/utbetaling-ressurs";
import {updateFormue} from "../../../generated/formue-ressurs/formue-ressurs";
import {updateVerdier} from "../../../generated/verdi-ressurs/verdi-ressurs";
import {updateBoutgifter} from "../../../generated/boutgift-ressurs/boutgift-ressurs";
import {updateBarneutgifter} from "../../../generated/barneutgift-ressurs/barneutgift-ressurs";
import {
    hentOkonomiskeOpplysninger,
    updateOkonomiskOpplysning,
} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {opplysningSpec} from "../../opplysninger";
import {VedleggRadFrontend} from "../../../generated/model";

const generateChecksum = (str1: string, str2: string): string =>
    (Array.from(str1 + str2).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 1e6).toString().padStart(6, "9");
const rowCountFromString = (str: string): number =>
    (Array.from(str).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 20) + 1;
const duplicateItems = <T>(items: T[], n: number): T[] => Array.from({length: n}, () => items).flat();

// Oppretter en maksimal søknad med fiktive data.
// For økonomiske opplysninger blir data generert basert på checksums
export const maximizeSoknad = async (soknadId: string) => {
    await updateBegrunnelse(soknadId, {
        hvaSokesOm: "Jeg trenger penger til å kjøpe mat.",
        hvorforSoke: "Jeg har ikke penger til mat.",
    });

    await updateUtdanning(soknadId, {
        erStudent: true,
        studengradErHeltid: true,
    });

    const ansvar = await hentForsorgerplikt(soknadId);

    await updateForsorgerplikt(soknadId, {
        ...ansvar,
        barnebidrag: "begge",
        harForsorgerplikt: true,
    });

    await updateBosituasjon(soknadId, {
        botype: "eier",
        antallPersoner: 2,
    });

    await putSkatteetatenSamtykke(soknadId, {
        samtykke: true,
    });

    await updateBostotte(soknadId, {
        bekreftelse: true,
    });

    await updateSamtykke1(soknadId, true);

    await updateStudielan(soknadId, {
        bekreftelse: true,
    });

    await updateUtbetalinger(soknadId, {
        bekreftelse: true,

        annet: true,
        beskrivelseAvAnnet: "beskrivelse av annet",
        forsikring: true,
        salg: true,
        utbytte: true,
    });

    await updateFormue(soknadId, {
        annet: true,
        beskrivelseAvAnnet: "beskrivelse av annet",
        brukskonto: true,
        bsu: true,
        livsforsikring: true,
        sparekonto: true,
        verdipapirer: true,
    });

    await updateVerdier(soknadId, {
        bekreftelse: true,
        annet: true,
        beskrivelseAvAnnet: "beskrivelse av annet",
        bolig: true,
        campingvogn: true,
        fritidseiendom: true,
        kjoretoy: true,
    });

    await updateBoutgifter(soknadId, {
        annet: true,
        bekreftelse: true,
        boliglan: true,
        husleie: true,
        kommunalAvgift: true,
        oppvarming: true,
        strom: true,
        skalViseInfoVedBekreftelse: true,
    });

    await updateBarneutgifter(soknadId, {
        annet: true,
        barnehage: true,
        bekreftelse: true,
        fritidsaktiviteter: true,
        harForsorgerplikt: true,
        sfo: true,
        tannregulering: true,
    });

    const opplysninger = await hentOkonomiskeOpplysninger(soknadId);

    opplysninger.okonomiskeOpplysninger?.forEach((opplysning) => {
        const {numRows} = opplysningSpec[opplysning.type];

        if (numRows === "flere" && opplysning.rader)
            opplysning.rader = duplicateItems(opplysning.rader, rowCountFromString(opplysning.type));

        opplysning.rader = opplysning.rader?.map((rad, rowNum) => {
            return Object.entries(rad).reduce((acc, [key, value]) => {
                const testValue = key === "beskrivelse" ? opplysning.type : generateChecksum(opplysning.type, key);
                return {...acc, [key]: `${testValue}${rowNum}`};
            }, {} as VedleggRadFrontend);
        });
    });

    console.log(opplysninger.okonomiskeOpplysninger);
    await Promise.all(
        opplysninger.okonomiskeOpplysninger!.map((opplysning) => updateOkonomiskOpplysning(soknadId, opplysning))
    );
};
