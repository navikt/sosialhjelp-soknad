import {Alert} from "@navikt/ds-react";
import Markdown from "markdown-to-jsx";
import {getDriftsmeldinger} from "./getDriftsmeldinger.ts";

export const Driftsmeldinger = async () =>
    (await getDriftsmeldinger())?.map(({severity, text}) => (
        <Alert
            variant={severity}
            fullWidth
            className={"justify-center [&>div]:max-w-lg [&>div]:lg:max-w-3xl [&>svg]:md:ml-8 [&>div]:w-full"}
        >
            <Markdown>{text}</Markdown>
        </Alert>
    ));
