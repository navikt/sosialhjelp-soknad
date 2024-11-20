"use client";

import {Attachment} from "@navikt/ds-icons";
import {BodyShort, ExpansionCard, Heading} from "@navikt/ds-react";
import React, {ReactNode} from "react";
import digisosConfig from "../../../lib/config";
import {EXPANSION_CARD_BORDER_STYLE_HACK, HovedmenyCardHeader} from "./HovedmenyCardHeader.tsx";
import {useTranslations} from "next-intl";

export const EttersendDokuPanel = () => {
    const t = useTranslations("EttersendDokuPanel");

    const lenke = (chunks: ReactNode) => <a href={digisosConfig.innsynURL}>{chunks}</a>;

    return (
        <ExpansionCard style={EXPANSION_CARD_BORDER_STYLE_HACK} aria-labelledby={"ettersend-heading"}>
            <HovedmenyCardHeader icon={<Attachment className={"w-6 h-6"} />}>
                <Heading level={"2"} size={"small"} id={"ettersend-heading"}>
                    {t("title")}
                </Heading>
            </HovedmenyCardHeader>
            <ExpansionCard.Content className={"!border-0"}>
                <BodyShort spacing>{t("text.p1")}</BodyShort>
                <ul className={"list-disc list-inside py-2"}>
                    <li>{t.rich("text.p2", {lenke})}</li>
                    <li>{t("text.p3")}</li>
                    <li>{t("text.p4")}</li>
                </ul>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
