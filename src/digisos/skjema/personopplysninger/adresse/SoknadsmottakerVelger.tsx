import * as React from "react";
import {Select} from "nav-frontend-skjema";
import {getIntlTextOrKey} from "../../../../nav-soknad/utils";
import {useIntl} from "react-intl";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import {NavEnhet} from "./AdresseTypes";

interface Props {
    navEnheter: NavEnhet[];
    label?: string;
    visible: boolean;
    ikkeVisPanel?: boolean;
    onVelgSoknadsmottaker: (soknadsmottaker: NavEnhet) => void;
}

const SoknadsmottakerVelger = (props: Props) => {
    const intl = useIntl();

    const velgNavKontor = (event: any) => {
        props.navEnheter.forEach((soknadsmottaker: NavEnhet) => {
            if (event.target.value === soknadsmottaker.enhetsnavn) {
                props.onVelgSoknadsmottaker(soknadsmottaker);
            }
        });
    };

    let enhetsnavn = "velg";
    if (props.navEnheter) {
        props.navEnheter.forEach((soknadsmottaker: NavEnhet) => {
            if (soknadsmottaker.valgt && soknadsmottaker.enhetsnavn) {
                enhetsnavn = soknadsmottaker.enhetsnavn;
            }
        });
    }

    const renderedSelect = (
        <Select
            className="velgNavKontorDropDown"
            label={props.label || ""}
            onChange={(event: any) => velgNavKontor(event)}
            value={enhetsnavn}
        >
            <option value="velg" key="velg" disabled={true}>
                {getIntlTextOrKey(intl, "kontakt.system.oppholdsadresse.velgMottaker")}
            </option>
            {props.navEnheter.map((soknadsmottaker: NavEnhet, index: number) => {
                return (
                    <option value={soknadsmottaker.enhetsnavn} key={index}>
                        {soknadsmottaker.enhetsnavn}
                    </option>
                );
            })}
        </Select>
    );
    if (props.ikkeVisPanel === true) {
        return renderedSelect;
    } else {
        return (
            <div className="skjema-sporsmal--jaNeiSporsmal">
                <Underskjema visible={props.visible} collapsable={true}>
                    <div className="utvidetAddresseSok">{renderedSelect}</div>
                </Underskjema>
            </div>
        );
    }
};

export default SoknadsmottakerVelger;
