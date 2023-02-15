import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import SkjemaIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/SkjemaIllustrasjon";
import Gruppe from "./Gruppe";
import {hentOpplysninger} from "../../redux/okonomiskeOpplysninger/opplysningerActions";
import {gruppeRekkefolge} from "../../redux/okonomiskeOpplysninger/opplysningerConfig";
import {REST_STATUS} from "../../redux/soknad/soknadTypes";
import {State} from "../../redux/reducers";
import {OpplysningerInformasjonspanel} from "./OpplysningerInformasjonspanel";
import {OpplysningerIkkeBesvartPanel} from "./OpplysningerIkkeBesvartPanel";
import {ApplicationSpinner} from "../../../nav-soknad/components/applicationSpinner/ApplicationSpinner";
import StegMedNavigasjon from "../../../nav-soknad/components/SkjemaSteg/LegacySkjemaSteg";

const OkonomiskeOpplysningerView = () => {
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const {opplysningerSortert, restStatus, backendData} = useSelector((state: State) => state.okonomiskeOpplysninger);
    const dispatch = useDispatch();

    React.useEffect(() => {
        behandlingsId && hentOpplysninger(behandlingsId, dispatch);
    }, [behandlingsId, dispatch]);

    const ikkeBesvartMeldingSkalVises: boolean | null = backendData && !backendData.isOkonomiskeOpplysningerBekreftet;
    if (restStatus === REST_STATUS.PENDING) return <ApplicationSpinner />;

    return (
        <StegMedNavigasjon skjemaConfig={digisosSkjemaConfig} steg={"opplysningerbolk"} ikon={<SkjemaIllustrasjon />}>
            <div>
                {ikkeBesvartMeldingSkalVises ? <OpplysningerIkkeBesvartPanel /> : <OpplysningerInformasjonspanel />}
                {gruppeRekkefolge.map((opplysningGruppe) => {
                    const opplysningerIGruppe = opplysningerSortert.filter((o) => o.gruppe === opplysningGruppe);
                    if (opplysningerIGruppe.length)
                        return (
                            <Gruppe key={opplysningGruppe} gruppeKey={opplysningGruppe} gruppe={opplysningerIGruppe} />
                        );
                    return null;
                })}
            </div>
        </StegMedNavigasjon>
    );
};

export default OkonomiskeOpplysningerView;
