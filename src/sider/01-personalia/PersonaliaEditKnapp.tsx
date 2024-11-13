import {useTranslation} from "react-i18next";
import {PencilIcon} from "@navikt/aksel-icons";
import * as React from "react";
import {Button} from "@navikt/ds-react/Button";
import {BodyShort} from "@navikt/ds-react";

export const PersonaliaEditKnapp = ({onClick}: {onClick: () => void}) => {
    const {t} = useTranslation("skjema");
    return (
        <Button variant={"tertiary"} onClick={onClick} data-testid="personalia-rediger-knapp">
            <div className={"flex flex-row gap-1 text-small items-center"}>
                <PencilIcon className={"h-[24px] w-[24px]"} aria-hidden={true} />
                <BodyShort size={"small"}>{t("kontakt.system.telefon.endreknapp.label")}</BodyShort>
            </div>
        </Button>
    );
};
