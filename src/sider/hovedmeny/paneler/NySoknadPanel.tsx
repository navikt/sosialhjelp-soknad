import {ExpansionCard, Heading} from "@navikt/ds-react";
import {NySoknadInfo} from "./NySoknad.tsx";
import {HovedmenyCardHeader} from "./HovedmenyCardHeader";
import {FillForms} from "@navikt/ds-icons";
import {useTranslations} from "next-intl";

export const NySoknadPanel = ({defaultOpen}: {defaultOpen?: boolean}) => (
    <ExpansionCard aria-labelledby={"nysoknad-heading"} defaultOpen={defaultOpen}>
        <HovedmenyCardHeader icon={<FillForms className={"w-6 h-6"} />}>
            <Heading id="nysoknad-heading" level={"2"} size={"small"}>
                {useTranslations("NySoknadPanel")("title")}
            </Heading>
        </HovedmenyCardHeader>
        <ExpansionCard.Content className={"!border-0"}>
            <NySoknadInfo />
        </ExpansionCard.Content>
    </ExpansionCard>
);
