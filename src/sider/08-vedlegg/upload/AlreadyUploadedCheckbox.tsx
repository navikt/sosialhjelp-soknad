import {useTranslation} from "react-i18next";
import {ChangeEvent} from "react";
import {Checkbox} from "@navikt/ds-react";
import cx from "classnames";
import {DokumentasjonDtoType} from "../../../generated/new/model";

interface Props {
    opplysningstype: DokumentasjonDtoType;
    disabled: boolean;
    alleredeLevert?: boolean;
    updateAlleredeLevert: (alleredeLevert: boolean) => void;
}

export const AlreadyUploadedCheckbox = ({opplysningstype, disabled, alleredeLevert, updateAlleredeLevert}: Props) => {
    const {t} = useTranslation();
    const handleAlleredeLastetOpp = async (event: ChangeEvent<HTMLInputElement>) => {
        updateAlleredeLevert(event.target.checked);
    };

    return (
        <Checkbox
            id={opplysningstype + "_allerede_lastet_opp_checkbox"}
            className={cx("vedleggLastetOppCheckbox", {
                "checkboks--disabled": disabled,
            })}
            onChange={handleAlleredeLastetOpp}
            checked={alleredeLevert}
            disabled={disabled}
        >
            {t("opplysninger.vedlegg.alleredelastetopp")}
        </Checkbox>
    );
};
