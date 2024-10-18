import {LinkButton} from "../../lib/components/LinkButton";
import {OpplysningInputRad} from "./OpplysningInputRad";
import {VedleggFrontend} from "../../generated/model";
import {useOpplysning} from "../../lib/hooks/dokumentasjon/useOpplysning";
import {useDokumentasjonTekster} from "../../lib/hooks/dokumentasjon/useDokumentasjonTekster";
import {useEffect, useRef} from "react";
import deepEqual from "deep-equal";

export const DokumentasjonRader = ({opplysning}: {opplysning: VedleggFrontend}) => {
    const {
        multirow,
        inputs,
        form: {control},
        rows: {entries, append, remove, update},
    } = useOpplysning(opplysning);

    const {leggtil} = useDokumentasjonTekster(opplysning.type);

    const previousEntriesRef = useRef(entries);

    // Sync entries with opplysning.rader on component mount or when opplysning changes
    useEffect(() => {
        if (deepEqual(entries, previousEntriesRef.current)) return;
        previousEntriesRef.current = entries;
        console.log("dokumentasjonRader");
        if (opplysning?.rader) {
            opplysning.rader.forEach((rad, index) => {
                if (entries[index]) {
                    // Merge existing entry with rader values, prioritizing rader
                    update(index, {...entries[index], ...rad});
                } else {
                    append(rad); // Append rader data to entries if no existing entry
                }
            });
        }
    }, [opplysning, append, update]);

    //TODO: multirow knappen skjules for lonnslipp|arbeid
    //TODO: dette på grunn av det kan skap forvirringer for søkeren på grunn av kor uoversiktlig det kan bli
    return (
        <>
            {entries.length > 0 && (
                <ul>
                    {entries.map(({id}, index) => (
                        <OpplysningInputRad
                            key={id}
                            textKey={opplysning.type}
                            index={index}
                            control={control}
                            fields={inputs}
                            onDelete={index > 0 ? () => remove(index) : undefined}
                        />
                    ))}
                    {multirow && opplysning.type !== "lonnslipp|arbeid" && (
                        <li className={`pt-3 pb-4`}>
                            <LinkButton onClick={() => append({})}>
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
