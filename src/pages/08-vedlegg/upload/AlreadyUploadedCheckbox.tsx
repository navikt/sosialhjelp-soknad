import {Opplysning} from "../../../lib/opplysninger";
import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId";
import {useTranslation} from "react-i18next";
import {useQueryClient} from "@tanstack/react-query";
import {
    updateOkonomiskOpplysning,
    useHentOkonomiskeOpplysninger,
} from "../../../generated/okonomiske-opplysninger-ressurs/okonomiske-opplysninger-ressurs";
import * as React from "react";
import {ChangeEvent} from "react";
import {Checkbox} from "@navikt/ds-react";
import cx from "classnames";
import {VedleggFrontendVedleggStatus} from "../../../generated/model";

export const AlreadyUploadedCheckbox = ({opplysning, disabled}: {opplysning: Opplysning; disabled: boolean}) => {
    const behandlingsId = useBehandlingsId();
    const {t} = useTranslation();
    const queryClient = useQueryClient();

    const {queryKey} = useHentOkonomiskeOpplysninger(behandlingsId);
    const handleAlleredeLastetOpp = async (event: ChangeEvent<HTMLInputElement>) => {
        await updateOkonomiskOpplysning(behandlingsId, {
            gruppe: opplysning.gruppe,
            type: opplysning.type,
            alleredeLevert: event.target.checked,
        });

        // FIXME: Don't know why this is needed, presumably race condition on back-end
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 200));

        await queryClient.invalidateQueries({queryKey});
    };

    return (
        <Checkbox
            id={opplysning.type + "_allerede_lastet_opp_checkbox"}
            className={cx("vedleggLastetOppCheckbox", {
                "checkboks--disabled": opplysning.filer?.length,
            })}
            onChange={handleAlleredeLastetOpp}
            checked={opplysning.vedleggStatus === VedleggFrontendVedleggStatus.VedleggAlleredeSendt}
            disabled={disabled}
        >
            {t("opplysninger.vedlegg.alleredelastetopp")}
        </Checkbox>
    );
};
