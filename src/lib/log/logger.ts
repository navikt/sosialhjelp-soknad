import {logger} from "@navikt/next-logger";

const extractSoknadId = (pathname: string): string | undefined => {
    const match = pathname.match(/\/sosialhjelp\/soknad\/skjema(\/kort)?\/([^/]+)\/\d+/);
    return match?.[2];
};

const getLogger = () =>
    typeof window !== "undefined"
        ? logger.child({
              pathname: window.location.pathname,
              referrer: window.document.referrer,
              soknadId: extractSoknadId(window.location.pathname),
          })
        : logger;

export default getLogger;
