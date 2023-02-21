import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import {digisosSkjemaConfig} from "../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import SkjemaIllustrasjon from "../../nav-soknad/components/svg/illustrasjoner/SkjemaIllustrasjon";
import Gruppe from "./Gruppe";
import {hentOpplysninger} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerActions";
import {gruppeRekkefolge} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";
import {State} from "../../digisos/redux/reducers";
import {OpplysningerInformasjonspanel} from "./OpplysningerInformasjonspanel";
import {OpplysningerIkkeBesvartPanel} from "./OpplysningerIkkeBesvartPanel";
import {ApplicationSpinner} from "../../nav-soknad/components/applicationSpinner/ApplicationSpinner";
import StegMedNavigasjon from "../../nav-soknad/components/SkjemaSteg/SkjemaStegLegacy";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {REST_STATUS} from "../../digisos/redux/soknadsdata/soknadsdataTypes";

const OkonomiskeOpplysningerView = () => {
    const behandlingsId = useBehandlingsId();
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
