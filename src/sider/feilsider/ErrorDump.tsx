import {BodyShort, Heading} from "@navikt/ds-react";
import StackTracey from "stacktracey";
import * as React from "react";

export const ErrorDump = ({error}: {error: Error}) => {
    const stackTrace = new StackTracey(error).clean().asTable();
    return (
        <section className={"font-mono space-y-2"}>
            <Heading level={"3"} size={"xsmall"}>
                Feilmelding:
            </Heading>
            <BodyShort>{error.message}</BodyShort>
            <Heading level={"3"} size={"xsmall"}>
                Stacktrace:
            </Heading>
            <pre>{stackTrace}</pre>
        </section>
    );
};
