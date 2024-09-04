import {Alert} from "@navikt/ds-react";
import {getApiStatus} from "../generated/driftsmelding.ts";
import {logger} from "@navikt/next-logger";

const Driftsmelding = ({variant, text}: {variant: "error" | "warning" | "info" | "success"; text: string}) => (
    <Alert
        variant={variant}
        fullWidth
        className={"justify-center [&>div]:max-w-lg [&>div]:lg:max-w-3xl [&>div]:w-full"}
    >
        {text}
    </Alert>
);

export const Driftsmeldinger = async () => {
    try {
        const {data: driftsmeldinger} = await getApiStatus({audience: "soknad"});
        return (
            <>
                {driftsmeldinger.map((driftsmelding) => (
                    <Driftsmelding key={driftsmelding.id} variant={driftsmelding.severity} text={driftsmelding.text} />
                ))}
            </>
        );
    } catch (e: any) {
        logger.warn("Failed to fetch driftsmeldinger", e);
        return null;
    }
};
