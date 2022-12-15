import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import {digisosSkjemaConfig} from "../../../nav-soknad/components/SkjemaSteg/digisosSkjema";
import SkjemaIllustrasjon from "../../../nav-soknad/components/svg/illustrasjoner/SkjemaIllustrasjon";
import Gruppe from "./Gruppe";
import {OpplysningGruppe, Opplysning} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {hentOpplysninger} from "../../redux/okonomiskeOpplysninger/opplysningerActions";
import {gruppeRekkefolge} from "../../redux/okonomiskeOpplysninger/opplysningerConfig";
import {REST_STATUS} from "../../redux/soknad/soknadTypes";
import {State} from "../../redux/reducers";
import {OpplysningerInformasjonspanel} from "./OpplysningerInformasjonspanel";
import {OpplysningerIkkeBesvartPanel} from "./OpplysningerIkkeBesvartPanel";
import {ApplicationSpinner} from "../../../nav-soknad/components/applicationSpinner/ApplicationSpinner";
import styled from "styled-components";
import {mobile} from "../../../nav-soknad/styles/variables";
import StegMedNavigasjon from "../../../nav-soknad/components/SkjemaSteg/SkjemaSteg";

const OkonomiskeOpplysningerContainer = styled.div`
    padding: 0 2rem;

    @media ${mobile} {
        padding: 1rem;
    }
`;

const OkonomiskeOpplysningerView = () => {
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const {opplysningerSortert, restStatus, backendData} = useSelector((state: State) => state.okonomiskeOpplysninger);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (behandlingsId) {
            hentOpplysninger(behandlingsId, dispatch);
        }
    }, [behandlingsId, dispatch]);

    const ikkeBesvartMeldingSkalVises: boolean | null = backendData && !backendData.isOkonomiskeOpplysningerBekreftet;

    if (restStatus === REST_STATUS.OK) {
        return (
            <StegMedNavigasjon
                skjemaConfig={digisosSkjemaConfig}
                steg={"opplysningerbolk"}
                ikon={<SkjemaIllustrasjon />}
            >
                <OkonomiskeOpplysningerContainer>
                    {!ikkeBesvartMeldingSkalVises && <OpplysningerInformasjonspanel />}
                    {ikkeBesvartMeldingSkalVises && <OpplysningerIkkeBesvartPanel />}
                    {gruppeRekkefolge.map((opplysningGruppe: OpplysningGruppe) => {
                        const opplysningerIGruppe: Opplysning[] = opplysningerSortert.filter((o: Opplysning) => {
                            return o.gruppe === opplysningGruppe;
                        });
                        if (opplysningerIGruppe.length === 0) {
                            return null;
                        }
                        return (
                            <Gruppe key={opplysningGruppe} gruppeKey={opplysningGruppe} gruppe={opplysningerIGruppe} />
                        );
                    })}
                </OkonomiskeOpplysningerContainer>
            </StegMedNavigasjon>
        );
    }

    return <ApplicationSpinner />;
};

export default OkonomiskeOpplysningerView;
