import {useSoknadId} from "../common/useSoknadId.ts";
import {useQueryClient} from "@tanstack/react-query";
import {
    EktefelleDto,
    EktefelleInput,
    Navn,
    SivilstandInput,
    SivilstandInputSivilstatus,
} from "../../../generated/new/model";
import {
    useGetSivilstand,
    useUpdateSivilstand,
} from "../../../generated/new/sivilstand-controller/sivilstand-controller.ts";
import {useState} from "react";

const tomtNavn: Navn = {
    fornavn: "",
    mellomnavn: "",
    etternavn: "",
};

export type EktefelleDtoOrInput =
    | EktefelleDto
    | (Partial<EktefelleInput> & {kildeErSystem: false; folkeregistrertMedEktefelle?: never})
    | undefined;

export const useSivilstatus = () => {
    const soknadId = useSoknadId();
    const queryClient = useQueryClient();
    const [isDelayedPending, setIsDelayedPending] = useState(false);
    const {data, isLoading, queryKey} = useGetSivilstand(soknadId);
    const {mutate, variables, isPending} = useUpdateSivilstand({
        mutation: {
            onSettled: (_data, _error, _variables, context) => {
                clearTimeout(context);
                setIsDelayedPending(false);
                return queryClient.invalidateQueries({queryKey});
            },
            onMutate: () => setTimeout(() => setIsDelayedPending(true), 300),
        },
    });

    const setSivilstatus = (nySivilstatus: SivilstandInputSivilstatus) => {
        const ektefelle = data?.ektefelle;

        const ektefelleInput: EktefelleInput | undefined = ektefelle
            ? {
                  ...ektefelle,
                  navn: ektefelle.navn ?? tomtNavn,
              }
            : undefined;

        const oppdatert: SivilstandInput = {
            sivilstatus: nySivilstatus,
            ektefelle: nySivilstatus === "GIFT" ? ektefelleInput : undefined,
        };

        mutate({soknadId: soknadId, data: oppdatert});
    };

    const setEktefelle = (nyEktefelle: EktefelleInput) => {
        const oppdatert: SivilstandInput = {
            ektefelle: nyEktefelle,
            sivilstatus: "GIFT",
        };

        mutate({soknadId: soknadId, data: oppdatert});
    };

    const ektefelle: EktefelleDtoOrInput = isPending
        ? {...variables?.data.ektefelle, kildeErSystem: false}
        : data?.ektefelle;

    const sivilstand = isPending ? variables?.data.sivilstatus : data?.sivilstatus;

    return {
        sivilstatus: sivilstand,
        ektefelle,
        setEktefelle,
        setSivilstatus,
        isLoading,
        isDelayedPending,
    };
};
