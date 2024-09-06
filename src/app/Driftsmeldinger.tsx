import {Alert, AlertProps} from "@navikt/ds-react";
import {getApiStatus} from "../generated/driftsmelding.ts";
import {logger} from "@navikt/next-logger";
import digisosConfig from "../lib/config.ts";
import Markdown from "markdown-to-jsx";

const DriftsmeldingView = ({variant, text}: {variant: AlertProps["variant"]; text: string}) => (
    <Alert
        variant={variant}
        fullWidth
        className={"justify-center [&>div]:max-w-lg [&>div]:lg:max-w-3xl [&>svg]:md:ml-8 [&>div]:w-full"}
    >
        <Markdown>{text}</Markdown>
    </Alert>
);

export const getDriftsmeldinger = async () => {
    if (!digisosConfig.driftsmeldingUrl) return [];

    try {
        const {data: driftsmeldinger} = await getApiStatus(
            {audience: "soknad"},
            {signal: AbortSignal.timeout(500), cache: "no-cache"}
        );
        return driftsmeldinger;
    } catch (e: any) {
        logger.warn("Failed to fetch driftsmeldinger", e);
        return [];
    }
};

export const Driftsmeldinger = async () => {
    const driftsmeldinger = await getDriftsmeldinger();

    return (
        <>
            {driftsmeldinger?.map((driftsmelding) => (
                <DriftsmeldingView key={driftsmelding.id} variant={driftsmelding.severity} text={driftsmelding.text} />
            ))}
        </>
    );
};
