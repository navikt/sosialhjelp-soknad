import * as React from "react";
import {Alert, BodyShort, Heading, HStack, Loader} from "@navikt/ds-react";
import {NavEnhetFrontend} from "../../../generated/model";
import {useTranslation} from "react-i18next";
import {erAktiv} from "../../../lib/navEnhetStatus";
import {NavEnhetInaktiv} from "./NavEnhetInaktiv";
import {NavEnhetDto} from "../../../generated/new/model";

interface Props {
    navEnhet: NavEnhetFrontend | NavEnhetDto | undefined;
    isPending?: boolean;
    isFetching?: boolean;
}

export const NavEnhet = ({navEnhet, isPending, isFetching}: Props) => {
    const {t} = useTranslation();
    if (!navEnhet || isPending) return null;
    const {enhetsnavn, kommunenavn} = navEnhet;

    if (!erAktiv(navEnhet)) return <NavEnhetInaktiv />;

    return (
        <Alert variant={"success"}>
            <HStack justify={"space-between"}>
                <Heading size={"small"} level={"4"} spacing>
                    {t("adresse.alertstripe.suksess")}
                </Heading>
                {isFetching && <Loader size={"small"} />}
            </HStack>
            <BodyShort>{t("adresse.alertstripe.navKontor", {enhetsnavn, kommunenavn})}</BodyShort>
        </Alert>
    );
};
