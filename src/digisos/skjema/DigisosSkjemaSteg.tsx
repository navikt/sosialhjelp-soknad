import * as React from "react";

import StegMedNavigasjon from "../../nav-soknad/containers/StegMedNavigasjon";
import {SkjemaConfig, SkjemaStegType} from "../redux/soknad/soknadTypes";

export enum DigisosSteg {
    kontakt = "kontakt",
    arbeidbolk = "arbeidbolk",
    familiebolk = "familiebolk",
    begrunnelsebolk = "begrunnelsebolk",
    bosituasjonbolk = "bosituasjonbolk",
    inntektbolk = "inntektbolk",
    utgifterbolk = "utgifterbolk",
    opplysningerbolk = "opplysningerbolk",
    oppsummering = "oppsummering",
}

export const digisosSkjemaConfig: SkjemaConfig = {
    tittelId: "applikasjon.sidetittel",
    skjemanavn: "digisos",
    steg: [
        {
            key: DigisosSteg.kontakt,
            stegnummer: 1,
            type: SkjemaStegType.skjema,
        },
        {
            key: DigisosSteg.begrunnelsebolk,
            stegnummer: 2,
            type: SkjemaStegType.skjema,
        },
        {
            key: DigisosSteg.arbeidbolk,
            stegnummer: 3,
            type: SkjemaStegType.skjema,
        },
        {
            key: DigisosSteg.familiebolk,
            stegnummer: 4,
            type: SkjemaStegType.skjema,
        },
        {
            key: DigisosSteg.bosituasjonbolk,
            stegnummer: 5,
            type: SkjemaStegType.skjema,
        },
        {
            key: DigisosSteg.inntektbolk,
            stegnummer: 6,
            type: SkjemaStegType.skjema,
        },
        {
            key: DigisosSteg.utgifterbolk,
            stegnummer: 7,
            type: SkjemaStegType.skjema,
        },
        {
            key: DigisosSteg.opplysningerbolk,
            stegnummer: 8,
            type: SkjemaStegType.skjema,
        },
        {
            key: DigisosSteg.oppsummering,
            stegnummer: 9,
            type: SkjemaStegType.oppsummering,
        },
    ],
};

const DigisosSkjemaSteg = (props: {
    steg: string;
    ikon?: React.ReactNode;
    children: any;
}) => (
    <StegMedNavigasjon
        skjemaConfig={digisosSkjemaConfig}
        stegKey={props.steg}
        ikon={props.ikon}
    >
        {props.children}
    </StegMedNavigasjon>
);

export default DigisosSkjemaSteg;
