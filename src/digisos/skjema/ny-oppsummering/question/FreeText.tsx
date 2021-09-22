import {BodyLong} from "@navikt/ds-react";

export const FreeText = (props: {felter?: {svar: string}[]}) => {
    if (!props.felter || props.felter.length === 0) return null;

    return (
        <div>
            {props.felter.map((felt) => (
                <BodyLong spacing>{felt.svar}</BodyLong>
            ))}
        </div>
    );
};
