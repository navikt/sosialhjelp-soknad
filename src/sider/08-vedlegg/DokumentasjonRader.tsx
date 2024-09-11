import {LinkButton} from "../../lib/components/LinkButton";
import {OpplysningInputRad} from "./OpplysningInputRad";
import {VedleggFrontend} from "../../generated/model";
import {useOpplysning} from "../../lib/hooks/dokumentasjon/useOpplysning";
import {useDokumentasjonTekster} from "../../lib/hooks/dokumentasjon/useDokumentasjonTekster";
import {useOpplysningContext} from "../../lib/OpplysningContextProvider.tsx";

export const DokumentasjonRader = ({opplysning}: {opplysning: VedleggFrontend}) => {
    const {
        multirow,
        inputs,
        form: {control},
        rows: {entries, append, remove},
    } = useOpplysning(opplysning);

    const {leggtil} = useDokumentasjonTekster(opplysning.type);

    const {dispatch} = useOpplysningContext();

    //TODO: multirow knappen skjules for lonnslipp|arbeid
    //TODO: dette på grunn av det kan skap forvirringer for søkeren på grunn av kor uoversiktlig det kan bli

    const handleAddRow = () => {
        const newRow = {}; // Adjust according to the structure of your row
        append(newRow); // Update react-hook-form state
        dispatch({type: "ADD_ROW", payload: newRow}); // Update context state
    };

    const handleRemoveRow = (index: number) => {
        remove(index);
        dispatch({type: "REMOVE_ROW", index});
    };

    return (
        <>
            {entries.length > 0 && (
                <ul>
                    {entries.map((row, index) => (
                        <OpplysningInputRad
                            key={row.id}
                            textKey={opplysning.type}
                            index={index}
                            control={control}
                            fields={inputs}
                            onDelete={() => handleRemoveRow(index)}
                        />
                    ))}
                    {multirow && opplysning.type !== "lonnslipp|arbeid" && (
                        <li className={`pt-3 pb-4`}>
                            <LinkButton onClick={handleAddRow}>
                                <span aria-hidden={true}>+ </span>
                                {leggtil}
                            </LinkButton>
                        </li>
                    )}
                </ul>
            )}
        </>
    );
};
