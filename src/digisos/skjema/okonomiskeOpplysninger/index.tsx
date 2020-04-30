import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import {FormattedHTMLMessage} from "react-intl";
import DigisosSkjemaSteg, {DigisosSteg} from "../DigisosSkjemaSteg";
import SkjemaIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/SkjemaIllustrasjon";
import NavFrontendSpinner from "nav-frontend-spinner";
import Informasjonspanel, {InformasjonspanelIkon} from "../../../nav-soknad/components/informasjonspanel";
import {DigisosFarge} from "../../../nav-soknad/components/svg/DigisosFarger";
import Gruppe from "./Gruppe";
import {OpplysningGruppe, Opplysning} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {hentOpplysninger} from "../../redux/okonomiskeOpplysninger/opplysningerActions";
import {gruppeRekkefolge} from "../../redux/okonomiskeOpplysninger/opplysningerConfig";
import {REST_STATUS} from "../../redux/soknad/soknadTypes";
import {State} from "../../redux/reducers";
import {OpplysningerInformasjonspanel} from "./OpplysningerInformasjonspanel";

type MaybeJsxElement = JSX.Element | null;

const OkonomiskeOpplysningerView = () => {
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const {opplysningerSortert, restStatus, backendData} = useSelector((state: State) => state.okonomiskeOpplysninger);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (behandlingsId) {
            dispatch(hentOpplysninger(behandlingsId));
        }
    }, [behandlingsId, dispatch]);

    const renderGrupper = (): MaybeJsxElement[] => {
        const grupperView = gruppeRekkefolge.map((opplysningGruppe: OpplysningGruppe) => {
            const opplysningerIGruppe: Opplysning[] = opplysningerSortert.filter((o: Opplysning) => {
                return o.gruppe === opplysningGruppe;
            });
            if (opplysningerIGruppe.length === 0) {
                return null;
            }
            return <Gruppe key={opplysningGruppe} gruppeKey={opplysningGruppe} gruppe={opplysningerIGruppe} />;
        });

        return grupperView;
    };

    const ikkeBesvartMeldingSkalVises: boolean | null = backendData && !backendData.isOkonomiskeOpplysningerBekreftet;

    const ikkeBesvartMelding: JSX.Element = (
        <div className="steg-ekstrainformasjon__infopanel">
            <Informasjonspanel ikon={InformasjonspanelIkon.HENSYN} farge={DigisosFarge.VIKTIG}>
                <FormattedHTMLMessage id="opplysninger.ikkebesvart.melding" />
            </Informasjonspanel>
        </div>
    );

    if (restStatus === REST_STATUS.OK) {
        return (
            <div className="steg-ekstrainformasjon">
                <DigisosSkjemaSteg steg={DigisosSteg.opplysningerbolk} ikon={<SkjemaIllustrasjon />}>
                    {!ikkeBesvartMeldingSkalVises && <OpplysningerInformasjonspanel />}
                    {ikkeBesvartMeldingSkalVises && ikkeBesvartMelding}
                    {renderGrupper()}
                </DigisosSkjemaSteg>
            </div>
        );
    }

    return (
        <div className="application-spinner">
            <NavFrontendSpinner type="XXL" />
        </div>
    );
};

export default OkonomiskeOpplysningerView;
