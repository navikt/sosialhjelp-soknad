import * as React from "react";
import {Alert, BodyShort, Heading} from "@navikt/ds-react";
import {erAktiv} from "../../../lib/navEnhetStatus";
import {NavEnhetInaktiv} from "./NavEnhetInaktiv";
import {useTranslations} from "next-intl";
import {NavEnhetDto} from "../../../generated/new/model";

export const NavEnhet = ({navEnhet: {enhetsnavn, kommunenavn, ...navEnhet}}: {navEnhet: NavEnhetDto}) => {
    const t = useTranslations("NavEnhet");

    return !erAktiv(navEnhet) ? (
        <NavEnhetInaktiv />
    ) : (
        <Alert variant={"success"}>
            <Heading size={"small"} level={"4"} spacing>
                {t("blirSendtTil")}
            </Heading>
            <BodyShort>{t("kontor", {enhetsnavn: enhetsnavn!, kommunenavn: kommunenavn!})}</BodyShort>
        </Alert>
    );
};
