import {Alert} from "@navikt/ds-react";
import Markdown from "markdown-to-jsx";
import {getDriftsmeldinger} from "./getDriftsmeldinger.ts";

export const Driftsmeldinger = async () => {
    const driftsmeldinger = await getDriftsmeldinger();
    return driftsmeldinger?.map(({severity, text}) => (
        <Alert
            variant={severity}
            fullWidth
            className={"justify-center [&>div]:max-w-lg lg:[&>div]:max-w-3xl md:[&>svg]:ml-8 [&>div]:w-full"}
        >
            <Markdown>{text}</Markdown>
        </Alert>
    ));
};
