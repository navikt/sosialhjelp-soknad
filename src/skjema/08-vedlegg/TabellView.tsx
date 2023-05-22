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
        form: {control, handleSubmit},
        rows: {entries, append, remove},
    } = useOpplysning(opplysning);

    return (
        <div>
            <form onSubmit={handleSubmit(console.log, console.error)}>
                <ul>
                    {entries.map((item, index) => (
                        <li key={item.id}>
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
                <button type={"submit"}>test</button>
            </form>
        </div>
    );
};

export default TabellView;
