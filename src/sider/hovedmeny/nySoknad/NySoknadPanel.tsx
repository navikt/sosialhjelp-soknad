import {ExpansionCard, Heading} from "@navikt/ds-react";
import {EXPANSION_CARD_BORDER_STYLE_HACK, HovedmenyCardHeader} from "../HovedmenyCardHeader.tsx";
import {FillForms} from "@navikt/ds-icons";
import {useTranslations} from "next-intl";
import {NySoknadInfo} from "./NySoknadInfo.tsx";

export const NySoknadPanel = ({defaultOpen}: {defaultOpen?: boolean}) => (
    <ExpansionCard
        style={EXPANSION_CARD_BORDER_STYLE_HACK}
        aria-labelledby={"nysoknad-heading"}
        defaultOpen={defaultOpen}
    >
        <HovedmenyCardHeader icon={<FillForms className={"w-6 h-6"} />}>
            <Heading id="nysoknad-heading" level={"2"} size={"small"}>
                {useTranslations("NySoknadPanel")("title")}
            </Heading>
        </HovedmenyCardHeader>
        <ExpansionCard.Content className={"border-0!"}>
            <NySoknadInfo />
        </ExpansionCard.Content>
    </ExpansionCard>
);
