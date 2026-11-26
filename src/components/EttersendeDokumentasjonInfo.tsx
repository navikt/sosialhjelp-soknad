import {InformationSquareIcon} from "@navikt/aksel-icons";
import {BodyLong, InfoCard, Link, List} from "@navikt/ds-react";
import {useTranslations} from "next-intl";
import digisosConfig from "../lib/config";

export const EttersendeDokumentasjonInfo = () => {
    const t = useTranslations("Components.EttersendeDokumentasjonInfo");

    return (
        <InfoCard data-color="info">
            <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                <InfoCard.Title>{t("title")}</InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>
                <BodyLong spacing>{t("content")}</BodyLong>
                <List as="ol">
                    <List.Item>
                        {t.rich("li1", {
                            link: (chunks) => <Link href={digisosConfig.innsynURL}>{chunks}</Link>,
                            bold: (chunks) => <b>{chunks}</b>,
                        })}
                    </List.Item>
                    <List.Item>{t("li2")}</List.Item>
                    <List.Item>
                        {t.rich("li3", {
                            bold: (chunks) => <b>{chunks}</b>,
                        })}
                    </List.Item>
                </List>
            </InfoCard.Content>
        </InfoCard>
    );
};
