import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage, useIntl} from "react-intl";
import EkspanderbartPanel from "nav-frontend-ekspanderbartpanel";
import {
    bekreftOppsummering,
    hentOppsumeringFeilet,
    hentOppsummering,
    setOppsumering,
} from "../../redux/oppsummering/oppsummeringActions";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import {State} from "../../redux/reducers";
import {finnOgOppdaterSoknadsmottakerStatus} from "../../redux/soknad/soknadActions";
import {Link} from "react-router-dom";
import BehandlingAvPersonopplysningerModal from "../../informasjon/BehandlingAvPersonopplysningerModal";
import SoknadsmottakerInfoPanel from "./SoknadsmottakerInfoPanel";
import BekreftCheckboksPanel from "nav-frontend-skjema/lib/bekreft-checkboks-panel";
import {REST_STATUS} from "../../redux/soknad/soknadTypes";
import NavFrontendSpinner from "nav-frontend-spinner";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import {Undertittel} from "nav-frontend-typografi";
import {Oppsummering} from "../../redux/oppsummering/oppsummeringTypes";
import {erProd, fetchOppsummering, HttpStatus} from "../../../nav-soknad/utils/rest-utils";
import {Oppsummering as NyOppsummering} from "../ny-oppsummering/Oppsummering";

const Bolker = (props: {oppsummering: Oppsummering}) => {
    const {behandlingsId} = useSelector((state: State) => state.soknad);

    const intl = useIntl();

    return (
        <div className="skjema-oppsummering">
            {props.oppsummering.bolker.map((bolk, idx) => (
                <div className="blokk-xs bolk" key={idx}>
                    <EkspanderbartPanel tittel={<Undertittel>{bolk.tittel}</Undertittel>} apen={false}>
                        <div>
                            <div className="bolk__rediger">
                                <Link className="lenke" to={`/skjema/${behandlingsId}/${idx + 1}`}>
                                    {getIntlTextOrKey(intl, "oppsummering.gatilbake")}
                                </Link>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: bolk.html}} />
                        </div>
                    </EkspanderbartPanel>
                </div>
            ))}
        </div>
    );
};

const OppsummeringView = () => {
    const {behandlingsId} = useSelector((state: State) => state.soknad);
    const {oppsummering, bekreftet, visBekreftMangler, restStatus} = useSelector((state: State) => state.oppsummering);

    const intl = useIntl();

    const dispatch = useDispatch();

    useEffect(() => {
        if (behandlingsId) {
            dispatch(finnOgOppdaterSoknadsmottakerStatus(behandlingsId));
            dispatch(hentOppsummering());
            fetchOppsummering(`soknader/${behandlingsId}/`)
                .then((response) => {
                    dispatch(setOppsumering(response));
                })
                .catch((reason) => {
                    if (reason.message === HttpStatus.UNAUTHORIZED) {
                        return;
                    }
                    dispatch(hentOppsumeringFeilet(reason));
                });
        }
    }, [behandlingsId, dispatch]);

    if (!erProd()) {
        return <NyOppsummering />;
    }

    if (restStatus === REST_STATUS.OK) {
        return (
            <DigisosSkjemaSteg steg={DigisosSteg.oppsummering}>
                <div>{oppsummering && <Bolker oppsummering={oppsummering} />}</div>

                <div className="infopanel-oppsummering skjema-sporsmal">
                    <SoknadsmottakerInfoPanel />
                </div>

                <div className="bekreftOpplysningerPanel blokk-xs bolk">
                    <BekreftCheckboksPanel
                        label={intl.formatMessage({
                            id: "soknadsosialhjelp.oppsummering.harLestSamtykker",
                        })}
                        checked={bekreftet ? bekreftet : false}
                        onChange={() => dispatch(bekreftOppsummering())}
                        feil={
                            visBekreftMangler
                                ? intl.formatMessage({
                                      id: "oppsummering.feilmelding.bekreftmangler",
                                  })
                                : ""
                        }
                    >
                        <p style={{marginTop: "0"}}>
                            <FormattedMessage id="soknadsosialhjelp.oppsummering.bekreftOpplysninger" />
                        </p>
                    </BekreftCheckboksPanel>
                </div>
                <BehandlingAvPersonopplysningerModal />
            </DigisosSkjemaSteg>
        );
    }

    return (
        <div className="application-spinner">
            <NavFrontendSpinner type="XXL" />
        </div>
    );
};

export default OppsummeringView;
