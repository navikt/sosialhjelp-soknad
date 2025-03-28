import {DokumentasjonRader} from "./DokumentasjonRader";
import {Dokumenter} from "./upload/Dokumenter";
import {Opplysning, OpplysningSpec, opplysningSpec, permutations} from "../../lib/opplysninger";
import {BodyShort, Heading, TextField} from "@navikt/ds-react";
import {useDokumentasjonTekster} from "../../lib/hooks/dokumentasjon/useDokumentasjonTekster";
import {PropsWithChildren} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {DigisosLanguageKey} from "../../lib/i18n/common.ts";
import {useTranslation} from "react-i18next";
import {LinkButton} from "../../lib/components/LinkButton.tsx";
import cx from "classnames";
import {OpplysningsType} from "../../lib/hooks/dokumentasjon/useGrupper.ts";

export const Dokumentasjon = ({opplysning}: {opplysning: Opplysning}) => {
    const {sporsmal, undertekst} = useDokumentasjonTekster(opplysning.type);

    return (
        <div className={"rounded-md bg-surface-action-subtle p-8"}>
            <Heading level={"4"} size={"small"} spacing>
                {sporsmal}
            </Heading>

            <BodyShort spacing>{undertekst}</BodyShort>
            <SubBoio opplysning={opplysning} />
        </div>
    );
};

const SubBoio = ({opplysning}: {opplysning: Opplysning}) => {
    const abc = opplysningSpec[opplysning.type];
    switch (abc.componentDescription) {
        case "avdragRenter":
            return <AvdragRenter />;
        case "belopBeskrivelse":
            return <BelopBeskrivelse />;
        case "belopFlere":
            return;
        case "bruttonetto":
            return;
        case "belopEn":
            return;
        case "ingen":
            return;
    }
};

interface AvdragRenterFormValues {
    avdragRenter: {
        renter: number | null;
        avdrag: number | null;
    }[];
}

interface AvdragRenterProps {
    opplysningspec: OpplysningSpec;
    opplysningstype: OpplysningsType;
}

const AvdragRenter = ({opplysningspec, opplysningstype}: AvdragRenterProps) => {
    const {t} = useTranslation("dokumentasjon");
    const {t: tSkjema} = useTranslation("skjema");
    const {control, register} = useForm<AvdragRenterFormValues>({
        defaultValues: {avdragRenter: [{renter: null, avdrag: null}]},
    });
    const {fields, remove, insert} = useFieldArray({name: "avdragRenter", control: control});
    return (
        <form>
            <ul>
                {fields.map((field, index) => {
                    return (
                        <li key={index}>
                            <TextField
                                {...register(`avdragRenter.${index}.renter`)}
                                className={cx("pb-2")}
                                label={
                                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                                        {
                                            t(
                                                `${opplysningspec.textKey}.renter.label` as DigisosLanguageKey<"dokumentasjon">
                                            ) as string
                                        }
                                    </span>
                                }
                            />
                            <TextField
                                {...register(`avdragRenter.${index}.avdrag`)}
                                className={cx("pb-2")}
                                label={
                                    <span style={{fontSize: 16, fontWeight: "normal"}}>
                                        {
                                            t(
                                                `${opplysningspec.textKey}.avdrag.label` as DigisosLanguageKey<"dokumentasjon">
                                            ) as string
                                        }
                                    </span>
                                }
                            />
                            <LinkButton onClick={() => remove(index)}>{tSkjema("opplysninger.fjern")}</LinkButton>
                        </li>
                    );
                })}
                {permutations[opplysningspec.componentDescription].numRows === 'flere' && opplysningstype !== "JOBB" && (
                  <li className={`pt-3 pb-4`}>
                      <LinkButton onClick={() => append({})}>
                          <span aria-hidden={true}>+ </span>
                          {isKort.data ? t("utbetalinger.inntekt.skattbar.kort_saldo_leggTil") : leggtil}
                      </LinkButton>
                  </li>
                )}
            </ul>
        </form>
    );
};

const BelopBeskrivelse = () => {
    return <></>;
};
