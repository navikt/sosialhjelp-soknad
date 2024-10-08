import {useState, useEffect} from "react";
import {useBegrunnelse} from "../hooks/data/useBegrunnelse";
import useSituasjon from "../hooks/data/kort/useSituasjon";
import {hentOkonomiskeOpplysninger} from "../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {getOppsummering} from "../../generated/oppsummering-ressurs/oppsummering-ressurs";
import {useBehandlingsId} from "../hooks/common/useBehandlingsId";
import {BegrunnelseFrontend} from "../../generated/model";
import {SituasjonsendringFrontend} from "../../generated/model";
import {VedleggFrontends} from "../../generated/model";
import {Oppsummering} from "../../generated/model";

interface AmplitudeData {
    begrunnelse: BegrunnelseFrontend | null;
    situasjon: SituasjonsendringFrontend | null;
    okonomiskeOpplysninger: VedleggFrontends | null;
    oppsummering: Oppsummering | null;
}

export const useDataForAmplitude = () => {
    const behandlingsId = useBehandlingsId();
    const [data, setData] = useState<AmplitudeData>({
        begrunnelse: null,
        situasjon: null,
        okonomiskeOpplysninger: null,
        oppsummering: null,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const {get: hentBegrunnelse} = useBegrunnelse();
    const {get: hentSituasjon} = useSituasjon();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [begrunnelseData, situasjonData, okonomiskeOpplysninger, oppsummeringData] = await Promise.all([
                    hentBegrunnelse(),
                    hentSituasjon(),
                    hentOkonomiskeOpplysninger(behandlingsId),
                    getOppsummering(behandlingsId),
                ]);

                setData({
                    begrunnelse: begrunnelseData,
                    situasjon: situasjonData,
                    okonomiskeOpplysninger: okonomiskeOpplysninger,
                    oppsummering: oppsummeringData,
                });
            } catch (error) {
                console.error("Error fetching data for Amplitude:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [behandlingsId, hentBegrunnelse, hentSituasjon]);

    return {data, isLoading, isError};
};
