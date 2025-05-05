import {useParams} from "react-router";

type SoknadUrlParams = Record<"soknadId", string | undefined>;

/**
 * Hent soknadId fra React Router URL-parametre.
 * @returns soknadId - fra react-router
 */
export const useSoknadId = (): string => useParams<SoknadUrlParams>().soknadId!;
