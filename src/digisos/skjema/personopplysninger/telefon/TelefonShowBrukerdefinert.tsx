import {useTranslation} from "react-i18next";
import {Systeminfo, SysteminfoItem} from "../../../../nav-soknad/components/systeminfo/Systeminfo";
import {formatTelefonnummer} from "@fremtind/jkl-formatters-util";
import {Button} from "@navikt/ds-react";
import * as React from "react";
import {strip47} from "./Telefon";

export const TelefonShowBrukerdefinert = ({
    brukerutfyltVerdi,
    onEdit,
}: {
    brukerutfyltVerdi?: string;
    onEdit: () => void;
}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt.system"});
    return (
        <>
            <Systeminfo>
                <SysteminfoItem label={t("telefon.label")}>
                    {brukerutfyltVerdi && formatTelefonnummer(strip47(brukerutfyltVerdi))}
                </SysteminfoItem>
            </Systeminfo>
            <div className={"space-x-2"}>
                <Button onClick={onEdit}>ENDRE</Button>
            </div>
        </>
    );
};
