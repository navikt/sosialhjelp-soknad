import {FormattedHTMLMessage, FormattedMessage} from "react-intl";
import * as React from "react";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import {
    connectSoknadsdataContainer,
    SoknadsdataContainerProps,
} from "../../redux/soknadsdata/soknadsdataContainerUtils";

type Props = SoknadsdataContainerProps;

class SoknadsmottakerInfoPanel extends React.Component<Props, {}> {
    render() {
        const {valgtSoknadsmottaker} = this.props.soknad;

        if (valgtSoknadsmottaker) {
            const valgtEnhetsNavn = `${valgtSoknadsmottaker.enhetsnavn}, ${valgtSoknadsmottaker.kommunenavn} kommune`;
            return (
                <Informasjonspanel farge={DigisosFarge.VIKTIG} ikon={InformasjonspanelIkon.BREVKONVOLUTT}>
                    <FormattedHTMLMessage
                        id="soknasosialhjelp.oppsummering.hvorsendes"
                        values={{navkontor: valgtEnhetsNavn}}
                    />

                    <button
                        className="linkbutton linkbutton--normal"
                        onClick={() => {
                            this.props.visSamtykkeInfo(true);
                        }}
                    >
                        <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke" />
                    </button>
                </Informasjonspanel>
            );
        } else {
            return null;
        }
    }
}

export default connectSoknadsdataContainer(SoknadsmottakerInfoPanel);
