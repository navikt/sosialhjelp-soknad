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
import {SoknadsmottakerInfoPanel} from "./SoknadsmottakerInfoPanel";
import BehandlingAvPersonopplysningerModal from "../../informasjon/BehandlingAvPersonopplysningerModal";
import {REST_STATUS} from "../../redux/soknad/soknadTypes";
import NavFrontendSpinner from "nav-frontend-spinner";
import {Link} from "react-router-dom";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import {UbesvarteSporsmalPanel} from "./UbesvarteSporsmalPanel";

interface Bolk {
    steg: number;
    tittel: string;
}

const bolker: Bolk[] = [
    {steg: 1, tittel: "Personopplysninger"},
    {steg: 2, tittel: "Hva søker du om?"},
    {steg: 3, tittel: "Arbeid og utdanning"},
    {steg: 4, tittel: "Familiesituasjon"},
    {steg: 5, tittel: "Bosituasjon"},
    {steg: 6, tittel: "Inntekt og formue"},
    {steg: 7, tittel: "Utgifter og gjeld"},
    {steg: 8, tittel: "Økonomiske opplysninger og vedlegg"},
];

export const Oppsummering = () => {
    const dispatch = useDispatch();

    const {bekreftet, visBekreftMangler, restStatus} = useSelector((state: State) => state.oppsummering);
    const {behandlingsId} = useSelector((state: State) => state.soknad);

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

    if (restStatus !== REST_STATUS.OK) {
        return (
            <div className="application-spinner">
                <NavFrontendSpinner type="XXL" />
            </div>
        );
    }

    return (
        <DigisosSkjemaSteg steg={DigisosSteg.oppsummering}>
            <UbesvarteSporsmalPanel />

            {bolker.map((bolk: Bolk) => {
                return (
                    <OppsummeringBolk bolk={bolk} key={bolk.steg}>
                        Noe innhold her
                    </OppsummeringBolk>
                );
            })}

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

const OppsummeringBolk = (props: {bolk: Bolk; children: React.ReactNode}) => {
    const {behandlingsId} = useSelector((state: State) => state.soknad);
    const intl = useIntl();

    return (
        <div className="oppsummering-bolk">
            <Ekspanderbartpanel
                className="oppsummering-ekspanderbart-panel"
                tittel={<BolkTittel tittel={props.bolk.tittel} ferdig={false} />}
            >
                <Link to={`/skjema/${behandlingsId}/${props.bolk.steg}`}>
                    {getIntlTextOrKey(intl, "oppsummering.gatilbake")}
                </Link>
                {props.children}
            </Ekspanderbartpanel>
        </div>
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
