import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../redux/reducers";
import Veilederpanel from "nav-frontend-veilederpanel";
import Brevkonvolutt from "../../../nav-soknad/components/svg/Brevkonvolutt";
import {FormattedMessage} from "react-intl";
import {visSamtykkeInfo} from "../../redux/soknad/soknadActions";
import {Undertittel, Normaltekst} from "nav-frontend-typografi";

export const SoknadsmottakerInfoPanel = () => {
    const valgtSoknadsmottaker = useSelector((state: State) => state.soknad.valgtSoknadsmottaker);
    const dispatch = useDispatch();
    if (valgtSoknadsmottaker) {
        const valgtEnhetsNavn = `${valgtSoknadsmottaker.enhetsnavn}, ${valgtSoknadsmottaker.kommunenavn} kommune`;
        return (
            <Veilederpanel
                type="plakat"
                fargetema="advarsel"
                svg={<Brevkonvolutt visBakgrundsSirkel={false} />}
                kompakt
            >
                <Undertittel>Søknaden din blir sendt til {valgtEnhetsNavn}</Undertittel>
                <Normaltekst>
                    Dette kontoret har ansvar for å behandle søknaden din, og {valgtEnhetsNavn} lagrer opplysningene fra
                    søknaden.
                </Normaltekst>

                <button
                    type="button"
                    className="linkbutton linkbutton--normal"
                    onClick={() => {
                        dispatch(visSamtykkeInfo(true));
                    }}
                >
                    <FormattedMessage id="informasjon.tekster.personopplysninger.rettigheter.lenke" />
                </button>
            </Veilederpanel>
        );
    } else {
        return null;
    }
};
