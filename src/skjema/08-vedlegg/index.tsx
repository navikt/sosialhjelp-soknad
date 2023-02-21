import * as React from "react";
import {useSelector, useDispatch} from "react-redux";
import Gruppe from "./Gruppe";
import {hentOpplysninger} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerActions";
import {vedleggGrupper} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";
import {State} from "../../digisos/redux/reducers";
import {OpplysningerInformasjonspanel} from "./OpplysningerInformasjonspanel";
import {OpplysningerIkkeBesvartPanel} from "./OpplysningerIkkeBesvartPanel";
import {ApplicationSpinner} from "../../nav-soknad/components/applicationSpinner/ApplicationSpinner";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {REST_STATUS} from "../../digisos/redux/soknadsdata/soknadsdataTypes";
import {SkjemaSteg} from "../../nav-soknad/components/SkjemaSteg/ny/SkjemaSteg";

const OkonomiskeOpplysningerView = () => {
    const behandlingsId = useBehandlingsId();
    const {opplysningerSortert, restStatus, backendData} = useSelector((state: State) => state.okonomiskeOpplysninger);
    const dispatch = useDispatch();

    React.useEffect(() => {
        behandlingsId && hentOpplysninger(behandlingsId, dispatch);
    }, [behandlingsId, dispatch]);

    const ikkeBesvartMeldingSkalVises: boolean | null = backendData && !backendData.isOkonomiskeOpplysningerBekreftet;
    if (restStatus === REST_STATUS.PENDING) return <ApplicationSpinner />;

    // Filtrer vekk tomme grupper, slik at vi kan bruke liste.length under for å mekke grønne linjer mellom ting
    const grupperMedInnhold = vedleggGrupper.filter((x) => opplysningerSortert.filter((y) => y.gruppe === x)?.length);

    return (
        <SkjemaSteg.Container page={8}>
            {grupperMedInnhold.map((opplysningGruppe, i) => (
                <SkjemaSteg.Content>
                    {i === 0 && (
                        <>
                            <SkjemaSteg.Title />
                            {ikkeBesvartMeldingSkalVises ? (
                                <OpplysningerIkkeBesvartPanel />
                            ) : (
                                <OpplysningerInformasjonspanel />
                            )}
                        </>
                    )}
                    <Gruppe
                        key={opplysningGruppe}
                        gruppeKey={opplysningGruppe}
                        gruppe={opplysningerSortert.filter(({gruppe}) => gruppe === opplysningGruppe)}
                    />
                    {i === grupperMedInnhold.length - 1 && <SkjemaSteg.Buttons />}
                </SkjemaSteg.Content>
            ))}
        </SkjemaSteg.Container>
    );
};

export default OkonomiskeOpplysningerView;
