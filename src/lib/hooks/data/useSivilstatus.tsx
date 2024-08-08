import {updateSivilstatus, useHentSivilstatus} from "../../../generated/client/sivilstatus-ressurs/sivilstatus-ressurs";
import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {EktefelleFrontend, SivilstatusFrontend, SivilstatusFrontendSivilstatus} from "../../../generated/client/model";
import {useState} from "react";

const blankPerson: EktefelleFrontend = {
    navn: {
        fornavn: "",
        mellomnavn: "",
        etternavn: "",
    },
};

export const useSivilstatus = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: sivilstatus, queryKey, isPending} = useHentSivilstatus(behandlingsId);
    const [usingPlaceholderEktefelle, setUsingPlaceholderEktefelle] = useState<boolean>(true);

    const setSivilstatus = async (nySivilstatus: SivilstatusFrontendSivilstatus) => {
        const ektefelle = sivilstatus?.ektefelle ?? {...blankPerson};

        const oppdatert: SivilstatusFrontend = {
            ...sivilstatus,
            sivilstatus: nySivilstatus,
            kildeErSystem: false,
            ektefelle: nySivilstatus === "gift" ? ektefelle : undefined,
            borSammenMed: nySivilstatus === "gift" ? sivilstatus?.borSammenMed : undefined,
        };

        await updateSivilstatus(behandlingsId, oppdatert);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    const setEktefelle = async (nyEktefelle: EktefelleFrontend, borSammenMed: boolean) => {
        const oppdatert: SivilstatusFrontend = {
            ...sivilstatus,
            ektefelle: nyEktefelle,
            borSammenMed,
        };

        await updateSivilstatus(behandlingsId, oppdatert);
        setUsingPlaceholderEktefelle(false);
        queryClient.setQueryData(queryKey, oppdatert);
    };

    const ektefelle = usingPlaceholderEktefelle ? undefined : sivilstatus?.ektefelle;

    return {sivilstatus, ektefelle, setEktefelle, setSivilstatus, isPending};
};
