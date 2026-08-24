import {ExpansionCard, Heading} from "@navikt/ds-react";
import {HovedmenyCardHeader} from "../HovedmenyCardHeader.tsx";
import {PencilWritingIcon} from "@navikt/aksel-icons";
import {useTranslations} from "next-intl";
import {NySoknadInfo} from "./NySoknadInfo.tsx";

export const NySoknadPanel = ({defaultOpen}: {defaultOpen?: boolean}) => (
    <ExpansionCard aria-labelledby={"nysoknad-heading"} defaultOpen={defaultOpen}>
        <HovedmenyCardHeader icon={<PencilWritingIcon className={"w-6 h-6"} />}>
            <Heading id="nysoknad-heading" level={"2"} size={"small"}>
                {useTranslations("NySoknadPanel")("title")}
            </Heading>
        </HovedmenyCardHeader>
        <ExpansionCard.Content className={"border-0!"}>
            <NySoknadInfo />
        </ExpansionCard.Content>
    </ExpansionCard>
);
