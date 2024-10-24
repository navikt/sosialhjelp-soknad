import {LinkButton} from "../../lib/components/LinkButton";
import {OpplysningInputRad} from "./OpplysningInputRad";
import {VedleggFrontend} from "../../generated/model";
import {useOpplysning} from "../../lib/hooks/dokumentasjon/useOpplysning";
import {useDokumentasjonTekster} from "../../lib/hooks/dokumentasjon/useDokumentasjonTekster";

export const DokumentasjonRader = ({opplysning}: {opplysning: VedleggFrontend}) => {
    const {
        multirow,
        inputs,
        form: {control},
        rows: {entries, append, remove},
    } = useOpplysning(opplysning);

    const {leggtil} = useDokumentasjonTekster(opplysning.type);

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
                    {multirow && (
                        <li className={"mt-6"}>
                            <LinkButton onClick={() => append({})}>
                                <span aria-hidden={true}>+ </span>
                                {leggtil}
                            </LinkButton>
                        </li>
                    )}
                </ul>
            )}
        </form>
    );
};
