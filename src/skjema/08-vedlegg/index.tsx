import * as React from "react";
import {useDispatch} from "react-redux";
import Gruppe from "./Gruppe";
import {hentOpplysninger, validVedleggFrontends} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerActions";
import {
    VedleggFrontendsMinusEtParTingSomTrengerAvklaring,
    vedleggGrupper,
} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";
import {OpplysningerInformasjonspanel} from "./OpplysningerInformasjonspanel";
import {OpplysningerIkkeBesvartPanel} from "./OpplysningerIkkeBesvartPanel";
import {ApplicationSpinner} from "../../nav-soknad/components/applicationSpinner/ApplicationSpinner";
import {useBehandlingsId} from "../../lib/hooks/useBehandlingsId";
import {SkjemaSteg} from "../../nav-soknad/components/SkjemaSteg/ny/SkjemaSteg";
import cx from "classnames";
import {useHentOkonomiskeOpplysninger} from "../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {getSortertListeAvOpplysninger} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerUtils";
import {VedleggFrontends} from "../../generated/model";

const useOpplysninger = () => {
    const behandlingsId = useBehandlingsId();

    //// Redux-hack for å forsikre oss om at retro-koden fremdeles henter dataene
    //// Har lært av feilen på barnebidragsiden :)
    const dispatch = useDispatch();
    React.useEffect(() => {
        hentOpplysninger(behandlingsId, dispatch);
    }, [behandlingsId, dispatch]);

    const {data, isLoading} = useHentOkonomiskeOpplysninger<
        VedleggFrontends | VedleggFrontendsMinusEtParTingSomTrengerAvklaring
    >(behandlingsId);

    if (data && !validVedleggFrontends(data)) {
        throw new Error("useOpplysninger mottok ugyldig spec - frontends API ute av synk med Swagger?");
    }

    return {
        data,
        isLoading,
        sorterte: data ? getSortertListeAvOpplysninger(data) : [],
        bekreftet: data?.isOkonomiskeOpplysningerBekreftet ?? undefined,
    };
};

const OkonomiskeOpplysningerView = () => {
    const {bekreftet, isLoading, sorterte} = useOpplysninger();

    if (isLoading) return <ApplicationSpinner />;

    // Filtrer vekk tomme grupper, slik at vi kan bruke liste.length under for å mekke grønne linjer mellom ting
    const grupperMedInnhold = vedleggGrupper.filter((x) => sorterte.filter((y) => y.gruppe === x)?.length);

    return (
        <SkjemaSteg.Container page={8}>
            {grupperMedInnhold.map((opplysningGruppe, i) => (
                <SkjemaSteg.Content key={i} className={cx("pb-12", {"lg:space-y-8": i === 0})}>
                    {i === 0 && (
                        <>
                            <SkjemaSteg.Title className={"lg:mb-8"} />
                            {bekreftet ? <OpplysningerIkkeBesvartPanel /> : <OpplysningerInformasjonspanel />}
                        </>
                    )}
                    <Gruppe
                        key={opplysningGruppe}
                        gruppeKey={opplysningGruppe}
                        gruppe={sorterte.filter(({gruppe}) => gruppe === opplysningGruppe)}
                    />
                    {i === grupperMedInnhold.length - 1 && <SkjemaSteg.Buttons />}
                </SkjemaSteg.Content>
            ))}
        </SkjemaSteg.Container>
    );
};

export default OkonomiskeOpplysningerView;
