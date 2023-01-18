import * as React from "react";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {Systeminfo, SysteminfoItem} from "../../../../nav-soknad/components/systeminfo/Systeminfo";
import {useBehandlingsId} from "../../../../nav-soknad/hooks/useBehandlingsId";
import {useAlgebraic} from "../../../../lib/hooks/useAlgebraic";
import {useHentBasisPersonalia} from "../../../../generated/basis-personalia-ressurs/basis-personalia-ressurs";
import {useErrorHandler} from "../../../../lib/hooks/useErrorHandler";
import {useTranslation} from "react-i18next";

// TODO: Figure out error handling
export const BasisPersonaliaData = () => {
    const {request} = useAlgebraic(useHentBasisPersonalia(useBehandlingsId()));
    const {t} = useTranslation("skjema", {keyPrefix: "kontakt.system.personalia"});
    const errorHandler = useErrorHandler();

    return request.match({
        NotAsked: () => null,
        Loading: () => <TextPlaceholder lines={3} />,
        Done: (response) =>
            response.match({
                Error: errorHandler,
                Ok: ({navn, fodselsnummer, statsborgerskap = "Ukjent/statsløs"}) => (
                    <Systeminfo>
                        <SysteminfoItem label={t("navn")}>{navn?.fulltNavn}</SysteminfoItem>
                        <SysteminfoItem label={t("fnr")}>{fodselsnummer}</SysteminfoItem>
                        <SysteminfoItem label={t("statsborgerskap")}>{statsborgerskap}</SysteminfoItem>
                    </Systeminfo>
                ),
            }),
    });
};
