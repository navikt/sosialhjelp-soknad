import {LinkButton} from "../../lib/components/LinkButton";
import {useOpplysning} from "./lib/hooks/useOpplysning";
import {OpplysningInputRad} from "./OpplysningInputRad";
import {VedleggFrontend} from "../../generated/model";
import {useOpplysningTekster} from "./lib/hooks/useOpplysningTekster";

export const DokumentasjonRader = ({opplysning}: {opplysning: VedleggFrontend}) => {
    const {
        textKey,
        multirow,
        inputs,
        form: {control},
        rows: {entries, append, remove},
    } = useOpplysning(opplysning);

    const {leggTilRad} = useOpplysningTekster(opplysning.type);

    //TODO: multirow knappen skjules for lonnslipp|arbeid
    //TODO: dette på grunn av det kan skap forvirringer for søkeren på grunn av kor uoversiktlig det kan bli

    return (
        <form>
            {entries.length > 0 && (
                <ul>
                    {entries.map(({id}, index) => (
                        <OpplysningInputRad
                            key={id}
                            textKey={textKey}
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
                                {leggTilRad}
                            </LinkButton>
                        </li>
                    )}
                </ul>
            )}
        </form>
    );
};
