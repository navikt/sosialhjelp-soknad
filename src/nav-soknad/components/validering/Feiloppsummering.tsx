import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Undertittel} from "nav-frontend-typografi";
import {scrollToElement} from "../../utils";
import {Valideringsfeil} from "../../../digisos/redux/validering/valideringActionTypes";
import {LinkButtonValidation} from "../linkButton/LinkButton";

const scrollToFaktum = (evt: React.MouseEvent<any>, faktumKey: string) => {
    evt.stopPropagation();
    evt.preventDefault();
    const faktumKeyUpdated: string = faktumKey.replace(/\./g, "_");
    const element: HTMLElement | null = document.getElementById(faktumKeyUpdated);
    if (element) {
        scrollToElement(element.id);
        element.focus();
    }
};

const FeillisteMelding = ({faktumKey, feilkode}: Valideringsfeil) => {
    return (
        <li className="feiloppsummering__feil">
            <LinkButtonValidation onClick={(evt) => scrollToFaktum(evt, faktumKey)}>
                <FormattedMessage id={feilkode} />
            </LinkButtonValidation>
        </li>
    );
};

interface Props {
    skjemanavn: string;
    visFeilliste?: boolean;
    valideringsfeil?: Valideringsfeil[];
}

const COMP_ID = "skjema-feiloppsummering";

class Feiloppsummering extends React.Component<Props, {}> {
    oppsummering!: HTMLDivElement;

    componentDidUpdate(prevProps: Props) {
        if (
            this.props.visFeilliste &&
            this.props.valideringsfeil &&
            this.props.valideringsfeil.length > 0 &&
            this.props.visFeilliste !== prevProps.visFeilliste
        ) {
            scrollToElement(COMP_ID);
            this.oppsummering.focus();
        }
    }

    render() {
        const {valideringsfeil} = this.props;
        if (valideringsfeil && (valideringsfeil.length === 0 || !this.props.visFeilliste)) {
            return null;
        }
        return (
            <div
                id={COMP_ID}
                className="panel panel--feiloppsummering"
                tabIndex={-1}
                ref={(c) => {
                    if (c) {
                        this.oppsummering = c;
                    }
                }}
            >
                <Undertittel className="feiloppsummering__tittel blokk-s">
                    Det er {valideringsfeil ? valideringsfeil.length : 1} feil i skjemaet
                </Undertittel>
                <ul className="feiloppsummering__liste">
                    {valideringsfeil &&
                        valideringsfeil.map((feilmld, index) => <FeillisteMelding key={index} {...feilmld} />)}
                </ul>
            </div>
        );
    }
}

export default Feiloppsummering;
