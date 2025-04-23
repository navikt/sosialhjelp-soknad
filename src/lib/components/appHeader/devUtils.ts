import {updateBegrunnelse} from "../../../generated/begrunnelse-ressurs/begrunnelse-ressurs";
import {updateUtdanning} from "../../../generated/utdanning-ressurs/utdanning-ressurs";
import {updateBosituasjon} from "../../../generated/bosituasjon-ressurs/bosituasjon-ressurs";
import {putSkatteetatenSamtykke} from "../../../generated/skattbar-inntekt-ressurs/skattbar-inntekt-ressurs";
import {updateStudielan} from "../../../generated/studielan-ressurs/studielan-ressurs";
import {updateUtbetalinger} from "../../../generated/utbetaling-ressurs/utbetaling-ressurs";
import {updateFormue} from "../../../generated/formue-ressurs/formue-ressurs";
import {updateVerdier} from "../../../generated/verdi-ressurs/verdi-ressurs";
import {updateBoutgifter} from "../../../generated/boutgift-ressurs/boutgift-ressurs";
import {updateBarneutgifter} from "../../../generated/barneutgift-ressurs/barneutgift-ressurs";
import {
    getForsorgerplikt,
    updateForsorgerplikt,
} from "../../../generated/new/forsorgerplikt-controller/forsorgerplikt-controller.ts";
import {updateBostotte} from "../../../generated/new/bostotte-controller/bostotte-controller.ts";

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

    const ansvar = await getForsorgerplikt(soknadId);

    await updateForsorgerplikt(soknadId, {
        ...ansvar,
        barnebidrag: "BEGGE",
    });

    await updateBosituasjon(soknadId, {
        botype: "eier",
        antallPersoner: 2,
    });

    await putSkatteetatenSamtykke(soknadId, {
        samtykke: true,
    });

    await updateBostotte(soknadId, {
        hasBostotte: true,
        hasSamtykke: true,
    });

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
};
