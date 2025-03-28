import {Opplysning} from "../../../lib/opplysninger";
import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId";
import {useTranslation} from "react-i18next";
import {useQueryClient} from "@tanstack/react-query";
import {
    useHentOkonomiskeOpplysninger,
} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import {ChangeEvent} from "react";
import {Checkbox} from "@navikt/ds-react";
import cx from "classnames";
import {
    DokumentasjonDtoDokumentasjonStatus,
} from "../../../generated/new/model";
import {
    useUpdateDokumentasjonStatus,
} from "../../../generated/new/dokumentasjon-controller/dokumentasjon-controller.ts";


export const AlreadyUploadedCheckbox = ({opplysning, disabled}: {opplysning: Opplysning; disabled: boolean}) => {
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();
    const queryClient = useQueryClient();

    const {queryKey} = useHentOkonomiskeOpplysninger(behandlingsId);

    const {mutate, variables, isPending} = useUpdateDokumentasjonStatus({
        mutation: {onSettled: () => queryClient.invalidateQueries({queryKey})},
    });
    const handleAlleredeLastetOpp = async (event: ChangeEvent<HTMLInputElement>) => {
        const alleredeLevert = event.target.checked;
        mutate({soknadId: behandlingsId, data: {type: opplysning.type, hasLevert: alleredeLevert}});
    };

    return (
        <Checkbox
            id={opplysning.type + "_allerede_lastet_opp_checkbox"}
            className={cx("vedleggLastetOppCheckbox", {
                "checkboks--disabled": opplysning.dokumenter?.length,
            })}
            onChange={handleAlleredeLastetOpp}
            checked={
                isPending
                    ? variables.data?.hasLevert
                    : opplysning.dokumentasjonStatus === DokumentasjonDtoDokumentasjonStatus.LEVERT_TIDLIGERE
            }
            disabled={disabled}
        >
            {t("opplysninger.vedlegg.alleredelastetopp")}
        </Checkbox>
    );
};
