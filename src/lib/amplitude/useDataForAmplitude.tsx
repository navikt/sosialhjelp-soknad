/**
import { useEffect, useState } from "react";
import { useBegrunnelse } from "../hooks/data/useBegrunnelse";
import { useSituasjon } from "../hooks/data/kort/useSituasjon";
import { useSendSoknad } from "../../sider/09-oppsummering/useSendSoknad";
import { hentOkonomiskeOpplysninger } from "../../generated/oppsummering-ressurs/oppsummering-ressurs"; // Example API for fetching economic info

export const useDataForAmplitude = (behandlingsId: string) => {
    const [amplitudeData, setAmplitudeData] = useState<any>(null);
    const { begrunnelse, hentBegrunnelse } = useBegrunnelse();
    const { situasjon, hentSituasjon } = useSituasjon(behandlingsId);
    const { sendSoknad, isError } = useSendSoknad(behandlingsId);

    useEffect(() => {
        // Fetch all necessary data
        const fetchData = async () => {
            try {
                await hentBegrunnelse();
                await hentSituasjon();

                // Assuming that hentOkonomiskeOpplysninger is a function that fetches document information
                const økonomiskeOpplysninger = await hentOkonomiskeOpplysninger(behandlingsId);

                // Once all data is fetched, prepare the data for Amplitude logging
                setAmplitudeData({
                    begrunnelse,
                    situasjon,
                    antallDokumenter: økonomiskeOpplysninger?.antallDokumenter || 0,
                });
            } catch (error) {
                console.error('Error fetching data for Amplitude:', error);
            }
        };

        fetchData();
    }, [behandlingsId, hentBegrunnelse, hentSituasjon]);

    return { amplitudeData, sendSoknad, isError };
};
*/
