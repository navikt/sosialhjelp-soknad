import * as React from "react";
import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import {useOpplysning} from "./useOpplysning";
import {VedleggFrontendMinusEtParTingSomTrengerAvklaring} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";
import {OpplysningInputRad} from "./OpplysningInputRad";

// FIXME I18N: Hardkodet bokmål

const TabellView = ({
    opplysning,
    gruppeIndex,
}: {
    opplysning: VedleggFrontendMinusEtParTingSomTrengerAvklaring;
    gruppeIndex: number;
}) => {
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
                {entries.map((item, index) => (
                    <li className="pb-4" key={item.id}>
                        <OpplysningInputRad textKey={textKey} index={index} control={control} fields={inputs} />
                        {!!index && <LinkButton onClick={() => remove(index)}>Fjern</LinkButton>}
                    </li>
                ))}
                {numRows === "flere" && (
                    <LinkButton onClick={() => append({})} id={gruppeIndex + "_link"}>
                        <span aria-hidden={true}>+ </span>Legg til
                    </LinkButton>
                )}
            </ul>
        </form>
    );
};

export default TabellView;
