import * as React from "react";
import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import {useOpplysning} from "./useOpplysning";
import {VedleggFrontendMinusEtParTingSomTrengerAvklaring} from "../../lib/opplysninger";
import {OpplysningInputRad} from "./OpplysningInputRad";
import {useTranslation} from "react-i18next";

// FIXME I18N: Hardkodet bokmål

const AddRowButton = ({onClick}: {onClick: () => void}) => {
    const {t} = useTranslation();

    return (
        <LinkButton onClick={onClick}>
            <span aria-hidden={true}>+ </span>
            {t("opplysninger.leggtil")}
        </LinkButton>
    );
};

const TabellView = ({opplysning}: {opplysning: VedleggFrontendMinusEtParTingSomTrengerAvklaring}) => {
    const {
        textKey,
        numRows,
        inputs,
        form: {control},
        rows: {entries, append, remove},
    } = useOpplysning(opplysning);

    return (
        <form>
            <ul>
                {entries.map(({id}, index) => (
                    <OpplysningInputRad
                        key={id}
                        className={"pb-4"}
                        textKey={textKey}
                        index={index}
                        control={control}
                        fields={inputs}
                        onDelete={index > 0 ? remove : undefined}
                    />
                ))}
                {numRows === "flere" && (
                    <li>
                        <AddRowButton onClick={() => append({})} />
                    </li>
                )}
            </ul>
        </form>
    );
};

export default TabellView;
