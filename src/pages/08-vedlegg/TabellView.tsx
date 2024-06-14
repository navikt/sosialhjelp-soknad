import {LinkButton} from "../../lib/components/LinkButton";
import {useOpplysning} from "./useOpplysning";
import {OpplysningInputRad} from "./OpplysningInputRad";
import {VedleggFrontend} from "../../generated/model";
import {useOpplysningTekster} from "./useOpplysningTekster";

export const TabellView = ({opplysning}: {opplysning: VedleggFrontend}) => {
    const {
        textKey,
        multirow,
        inputs,
        form: {control},
        rows: {entries, append, remove},
    } = useOpplysning(opplysning);

    const {leggTilRad} = useOpplysningTekster(opplysning.type);

    return (
        <form onSubmit={(e) => e.preventDefault()}>
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
                    {multirow && (
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
