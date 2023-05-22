import * as React from "react";
import {RefAttributes} from "react";
import {OpplysningInputType} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import {useTranslation} from "react-i18next";
import {TextField, TextFieldProps} from "@navikt/ds-react";
import {useOpplysning, VedleggRadFrontendForm} from "./useOpplysning";
import {Control, Controller} from "react-hook-form";
import {VedleggFrontendMinusEtParTingSomTrengerAvklaring} from "../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";

// FIXME I18N: Hardkodet bokmål

const TabellRadInput = ({
    fields,
    index,
    control,
    textKey,
}: {
    fields: OpplysningInputType[];
    index: number;
    control: Control<VedleggRadFrontendForm>;
    textKey: string;
}) => {
    const {t} = useTranslation();

    return (
        <div>
            {fields.map((fieldName) => (
                <Controller
                    render={({field, fieldState}) => {
                        const formatSpecifier: Partial<TextFieldProps & RefAttributes<HTMLInputElement>> =
                            fieldName === `beskrivelse`
                                ? {
                                      maxLength: 100,
                                      type: "text",
                                      htmlSize: 40,
                                  }
                                : {
                                      type: "text",
                                      inputMode: "numeric",
                                      pattern: "[0-9]*",
                                      maxLength: 8,
                                      htmlSize: 14,
                                  };

                        return (
                            <TextField
                                label={t(`${textKey}.${fieldName}.label`)}
                                error={fieldState.error?.message}
                                {...formatSpecifier}
                                {...field}
                            />
                        );
                    }}
                    name={`rader.${index}.${fieldName}`}
                    control={control}
                />
            ))}
        </div>
    );
};

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
        handleSubmit,
        control,
        rows: {entries, append, remove},
    } = useOpplysning(opplysning);

    return (
        <div>
            <form onSubmit={handleSubmit(console.log, console.error)}>
                <ul>
                    {entries.map((item, index) => (
                        <li key={item.id}>
                            <TabellRadInput textKey={textKey} index={index} control={control} fields={inputs} />
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
