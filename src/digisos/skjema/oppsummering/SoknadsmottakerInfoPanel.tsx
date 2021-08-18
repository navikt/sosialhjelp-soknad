import {FormattedMessage} from "react-intl";
import * as React from "react";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import {LinkButton} from "../../../nav-soknad/components/linkButton/LinkButton";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {visSamtykkeInfo} from "../../redux/soknad/soknadActions";

const SoknadsmottakerInfoPanel = () => {
    const {valgtSoknadsmottaker} = useSelector((state: State) => state.soknad);

    const dispatch = useDispatch();

    if (valgtSoknadsmottaker) {
        const valgtEnhetsNavn = `${valgtSoknadsmottaker.enhetsnavn}, ${valgtSoknadsmottaker.kommunenavn} kommune`;
        return (
            <Informasjonspanel farge={DigisosFarge.VIKTIG} ikon={InformasjonspanelIkon.BREVKONVOLUTT}>
                <p>
                    <strong>
                        <FormattedMessage
                            id="soknasosialhjelp.oppsummering.hvorsendes_del1"
                            values={{navkontor: valgtEnhetsNavn}}
                        />
                    </strong>
                </p>
                <p>
                    <FormattedMessage
                        id="soknasosialhjelp.oppsummering.hvorsendes_del2"
                        values={{navkontor: valgtEnhetsNavn}}
                    />
                </p>
                <LinkButton
                    type="button"
                    onClick={() => {
                        dispatch(visSamtykkeInfo(true));
                    }}
                >
                    <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke" />
                </LinkButton>
            </Informasjonspanel>
        );
    } else {
        return null;
    }
};

export default SoknadsmottakerInfoPanel;
