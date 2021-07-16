import React, {useEffect} from "react";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {EtikettSuksess, EtikettFokus} from "nav-frontend-etiketter";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../redux/reducers";
import {finnOgOppdaterSoknadsmottakerStatus} from "../../redux/soknad/soknadActions";
import {
    bekreftOppsummering,
    hentNyOppsummering,
    hentOppsumeringFeilet,
    setNyOppsummering,
} from "../../redux/oppsummering/oppsummeringActions";
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
import {NyOppsummeringBolk, NyOppsummeringResponse} from "../../redux/oppsummering/oppsummeringTypes";
import {fetchToJson, HttpStatus} from "../../../nav-soknad/utils/rest-utils";

export const Oppsummering = () => {
    const dispatch = useDispatch();

    const {bekreftet, visBekreftMangler, restStatus, nyOppsummering} = useSelector(
        (state: State) => state.oppsummering
    );
    const {behandlingsId} = useSelector((state: State) => state.soknad);

    const harUbesvarteSporsmal =
        nyOppsummering.filter((bolk: NyOppsummeringBolk) => bolk.erUtfylt === false).length > 0;

    const intl = useIntl();

    useEffect(() => {
        if (behandlingsId) {
            dispatch(finnOgOppdaterSoknadsmottakerStatus(behandlingsId));
            dispatch(hentNyOppsummering());
            fetchToJson<NyOppsummeringResponse>(`soknader/${behandlingsId}/oppsummering`)
                .then((response) => {
                    dispatch(setNyOppsummering(response));
                })
                .catch((reason) => {
                    if (reason.message === HttpStatus.UNAUTHORIZED) {
                        return;
                    }
                    dispatch(hentOppsumeringFeilet(reason));
                });
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
            {harUbesvarteSporsmal && <UbesvarteSporsmalPanel />}

            {nyOppsummering.map((bolk: NyOppsummeringBolk) => {
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
                              feilmelding: intl.formatMessage({
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

const OppsummeringBolk = (props: {bolk: NyOppsummeringBolk; children: React.ReactNode}) => {
    const {behandlingsId} = useSelector((state: State) => state.soknad);
    const intl = useIntl();

    return (
        <div className="oppsummering-bolk">
            <Ekspanderbartpanel
                className="oppsummering-ekspanderbart-panel"
                tittel={<BolkTittel tittel={props.bolk.tittel} ferdig={props.bolk.erUtfylt} />}
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
