"use client";
import {Alert} from "@navikt/ds-react";
import Markdown from "markdown-to-jsx";
import {getDriftsmeldinger} from "./getDriftsmeldinger.ts";
import {useEffect, useState} from "react";
import {Driftsmelding} from "./types.ts";

export const Driftsmeldinger = () => {
    const [driftsmeldinger, setDriftsmeldinger] = useState<Driftsmelding[] | null>(null);
    useEffect(() => {
        getDriftsmeldinger().then(setDriftsmeldinger);
    }, []);
    return driftsmeldinger?.map(({severity, text}) => (
        <Alert
            variant={severity}
            fullWidth
            className={"justify-center [&>div]:max-w-lg [&>div]:lg:max-w-3xl [&>svg]:md:ml-8 [&>div]:w-full"}
        >
            <Markdown>{text}</Markdown>
        </Alert>
    ));
};
