import * as React from "react";
import {Alert, BodyShort, Heading} from "@navikt/ds-react";
import {erAktiv} from "../../../lib/navEnhetStatus";
import {NavEnhetInaktiv} from "./NavEnhetInaktiv";
import {useTranslations} from "next-intl";
import {NavEnhetDto} from "../../../generated/new/model";

export const NavEnhet = ({navEnhet}: {navEnhet: NavEnhetDto | undefined}) => {
    const t = useTranslations("NavEnhet");
    if (!navEnhet) return null;
    const {enhetsnavn, kommunenavn} = navEnhet;

    if (!erAktiv(navEnhet)) return <NavEnhetInaktiv />;

    return (
        <Alert variant={"success"}>
            <Heading size={"small"} level={"4"} spacing>
                {t("blirSendtTil")}
            </Heading>
            <BodyShort>{t("kontor", {enhetsnavn, kommunenavn})}</BodyShort>
        </Alert>
    );
};
