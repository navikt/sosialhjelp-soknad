import {LinkButton} from "../../lib/components/LinkButton";
import {OpplysningInputRad} from "./OpplysningInputRad";
import {VedleggFrontend} from "../../generated/model";
import {useOpplysning} from "../../lib/hooks/dokumentasjon/useOpplysning";
import {useDokumentasjonTekster} from "../../lib/hooks/dokumentasjon/useDokumentasjonTekster";
import useIsKort from "../../lib/hooks/data/useIsKort.ts";
import {useTranslation} from "react-i18next";

export const DokumentasjonRader = ({opplysning}: {opplysning: VedleggFrontend}) => {
    const {
        multirow,
        inputs,
        form: {control},
        rows: {entries, append, remove},
    } = useOpplysning(opplysning);
    const {t} = useTranslation("skjema");

    const isKort = useIsKort();

    const {leggtil} = useDokumentasjonTekster(opplysning.type);

    //TODO: multirow knappen skjules for lonnslipp|arbeid
    //TODO: dette på grunn av det kan skap forvirringer for søkeren på grunn av kor uoversiktlig det kan bli

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            {entries.length > 0 && (
                <ul>
                    {entries.map(({id}, index) => (
                        <OpplysningInputRad
                            key={id}
                            textKey={opplysning.type}
                            index={index}
                            control={control}
                            fields={inputs}
                            onDelete={index > 0 ? remove : undefined}
                        />
                    ))}
                    {multirow && opplysning.type !== "lonnslipp|arbeid" && (
                        <li className={`pt-3 pb-4`}>
                            <LinkButton onClick={() => append({})}>
                                <span aria-hidden={true}>+ </span>
                                {isKort.data ? t("utbetalinger.inntekt.skattbar.kort_saldo_leggTil") : leggtil}
                            </LinkButton>
                        </li>
                    )}
                </ul>
            )}
        </form>
    );
};
