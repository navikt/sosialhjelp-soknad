import * as React from "react";
import {Select} from "nav-frontend-skjema";
import {getIntlTextOrKey, IntlProps} from "../../../../nav-soknad/utils";
import {injectIntl} from "react-intl";
import Underskjema from "../../../../nav-soknad/components/underskjema";
import {NavEnhet} from "./AdresseTypes";

interface OwnProps {
    navEnheter: NavEnhet[];
    label?: string;
    visible: boolean;
    ikkeVisPanel?: boolean;
    onVelgSoknadsmottaker: (soknadsmottaker: NavEnhet) => void;
}

type Props = OwnProps & IntlProps;

class SoknadsmottakerVelger extends React.Component<Props, {}> {
    velgNavKontor(event: any) {
        this.props.navEnheter.forEach((soknadsmottaker: NavEnhet) => {
            if (event.target.value === soknadsmottaker.enhetsnavn) {
                this.props.onVelgSoknadsmottaker(soknadsmottaker);
            }
        });
    }

    render() {
        const {navEnheter, ikkeVisPanel, intl} = this.props;
        let enhetsnavn = "velg";
        if (navEnheter) {
            navEnheter.forEach((soknadsmottaker: NavEnhet) => {
                if (soknadsmottaker.valgt && soknadsmottaker.enhetsnavn) {
                    enhetsnavn = soknadsmottaker.enhetsnavn;
                }
            });
        }

        const renderedSelect = (
            <Select
                className="velgNavKontorDropDown"
                label={this.props.label || ""}
                onChange={(event: any) => this.velgNavKontor(event)}
                value={enhetsnavn}
            >
                <option value="velg" key="velg" disabled={true}>
                    {getIntlTextOrKey(intl, "kontakt.system.oppholdsadresse.velgMottaker")}
                </option>
                {navEnheter.map((soknadsmottaker: NavEnhet, index: number) => {
                    return (
                        <option value={soknadsmottaker.enhetsnavn} key={index}>
                            {soknadsmottaker.enhetsnavn}
                        </option>
                    );
                })}
            </Select>
        );
        if (ikkeVisPanel === true) {
            return renderedSelect;
        } else {
            return (
                <div className="skjema-sporsmal--jaNeiSporsmal">
                    <Underskjema visible={this.props.visible} collapsable={true}>
                        <div className="utvidetAddresseSok">{renderedSelect}</div>
                    </Underskjema>
                </div>
            );
        }
    }
}

export default injectIntl(SoknadsmottakerVelger);
