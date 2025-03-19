import {useBehandlingsId} from "../common/useBehandlingsId";
import {useQueryClient} from "@tanstack/react-query";
import {useGetUtdanning, useUpdateUtdanning} from "../../../generated/new/utdanning-controller/utdanning-controller.ts";
import {
    useGetArbeid,
    useUpdateKommentarArbeidsforhold,
} from "../../../generated/new/arbeid-controller/arbeid-controller.ts";
import {ArbeidDto, ArbeidInput, UpdateUtdanningBody, UtdanningDto} from "../../../generated/new/model/index.ts";

export const useArbeidOgUtdanning = () => {
    const behandlingsId = useBehandlingsId();
    const queryClient = useQueryClient();
    const {data: arbeidData, isLoading: isLoadingArbeid, queryKey: arbeidKey} = useGetArbeid(behandlingsId);
    const {data: utdanningData, isLoading: isLoadingUtdanning, queryKey: utdanningKey} = useGetUtdanning(behandlingsId);
    const {
        mutate: mutateArbeid,
        isPending: isArbeidPending,
        variables: arbeidVariables,
    } = useUpdateKommentarArbeidsforhold({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey: arbeidKey})},
    });
    const {
        mutate: mutateUtdanning,
        isPending: isUtdanningPending,
        variables: utdanningVariables,
    } = useUpdateUtdanning({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey: utdanningKey})},
    });

    const updateArbeid = (arbeid: ArbeidInput) => mutateArbeid({soknadId: behandlingsId, data: arbeid});

    const updateUtdanning = (utdanning: UpdateUtdanningBody) =>
        mutateUtdanning({soknadId: behandlingsId, data: utdanning});

    const arbeid: ArbeidDto | undefined = isArbeidPending
        ? {
              arbeidsforholdList: arbeidData?.arbeidsforholdList ?? [],
              kommentar: arbeidVariables?.data.kommentarTilArbeidsforhold,
          }
        : arbeidData;

    const utdanning: UtdanningDto | undefined = isUtdanningPending
        ? toUtdanningDto(utdanningVariables?.data, utdanningData)
        : utdanningData;
    return {arbeid, utdanning, updateUtdanning, updateArbeid, isLoading: isLoadingUtdanning || isLoadingArbeid};
};

const toUtdanningDto = (utdanning?: UpdateUtdanningBody, data?: UtdanningDto): UtdanningDto | undefined => {
    switch (utdanning?.type) {
        case "IkkeStudent":
            return {...data, erStudent: utdanning.erStudent};
        case "Studentgrad":
            return {
                erStudent: true,
                studentgrad: utdanning.studentgrad,
            };
    }
};
