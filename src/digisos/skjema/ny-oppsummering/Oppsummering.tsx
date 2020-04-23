import React, {useEffect} from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {EtikettSuksess, EtikettFokus} from "nav-frontend-etiketter";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../redux/reducers";
import {finnOgOppdaterSoknadsmottakerStatus} from "../../redux/soknad/soknadActions";
import {hentOppsummering, bekreftOppsummering} from "../../redux/oppsummering/oppsummeringActions";
import {Undertittel} from "nav-frontend-typografi";
import BekreftCheckboksPanel from "nav-frontend-skjema/lib/bekreft-checkboks-panel";
import {FormattedMessage, useIntl} from "react-intl";
import SoknadsmottakerInfoPanel from "../oppsummering/SoknadsmottakerInfoPanel";
import BehandlingAvPersonopplysningerModal from "../../informasjon/BehandlingAvPersonopplysningerModal";

export const Oppsummering = () => {
    const dispatch = useDispatch();

    const {oppsummering, bekreftet, visBekreftMangler, restStatus} = useSelector((state: State) => state.oppsummering);
    const {behandlingsId, valgtSoknadsmottaker} = useSelector((state: State) => state.soknad);
    const soknadsdata = useSelector((state: State) => state.soknadsdata);

    const intl = useIntl();

    useEffect(() => {
        if (behandlingsId) {
            dispatch(finnOgOppdaterSoknadsmottakerStatus(behandlingsId));
            dispatch(hentOppsummering()); // Kanskje denne kan fjernes hvis vi ikke skal bruke handlebarkode?
        }
    }, [behandlingsId, dispatch]);

    const bekreftOpplysninger: string = intl.formatMessage({
        id: "soknadsosialhjelp.oppsummering.harLestSamtykker",
    });

    return (
        <DigisosSkjemaSteg steg={DigisosSteg.oppsummering}>
            <OppsummeringBolk tittel="Viktig tittel">Noe innhold her</OppsummeringBolk>

            <SoknadsmottakerInfoPanel />

            <BekreftCheckboksPanel
                label={bekreftOpplysninger}
                checked={bekreftet ? bekreftet : false}
                onChange={() => dispatch(bekreftOppsummering())}
                feil={
                    visBekreftMangler
                        ? {
                              feilmelding: intl.formatHTMLMessage({
                                  id: "oppsummering.feilmelding.bekreftmangler",
                              }),
                          }
                        : undefined
                }
            >
                <p style={{marginTop: "0"}}>
                    <FormattedMessage id="soknadsosialhjelp.oppsummering.bekreftOpplysninger" />
                </p>
            </BekreftCheckboksPanel>

            <BehandlingAvPersonopplysningerModal />
        </DigisosSkjemaSteg>
    );
};

const OppsummeringBolk = (props: {tittel: string; children: React.ReactNode}) => {
    return (
        <Ekspanderbartpanel tittel={<BolkTittel tittel={props.tittel} ferdig={false} />}>
            {props.children}
        </Ekspanderbartpanel>
    );
};

const BolkTittel = (props: {tittel: string; ferdig: boolean}) => {
    return (
        <div className="oppsummering-bolk-tittel-container">
            <Undertittel>{props.tittel}</Undertittel>
            {props.ferdig ? <EtikettSuksess>Ferdig utfylt</EtikettSuksess> : <EtikettFokus>Svar mangler</EtikettFokus>}
        </div>
    );
};

export default Oppsummering;
