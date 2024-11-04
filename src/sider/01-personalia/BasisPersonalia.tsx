import * as React from "react";
import {Systeminfo, SysteminfoItem} from "../../lib/components/systeminfo/Systeminfo";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";
import {useHentBasisPersonalia} from "../../generated/basis-personalia-ressurs/basis-personalia-ressurs";
import {useTranslation} from "react-i18next";
import {formatFodselsnummer} from "@fremtind/jkl-formatters-util";
import {BodyShort, Heading} from "@navikt/ds-react";
import {useIsNyDatamodell} from "../../generated/soknad-ressurs/soknad-ressurs.ts";
import {useGetBasisPersonalia} from "../../generated/new/basis-personalia-controller/basis-personalia-controller.ts";
import {NavnDto} from "../../generated/new/model/index.ts";
import {NavnFrontend} from "../../generated/model/index.ts";
import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder.tsx";

interface Props {
    navn?: NavnDto | NavnFrontend;
    fodselsnummer?: string | null;
    statsborgerskap?: string;
}

const Personalia = ({navn, fodselsnummer, statsborgerskap = "Ukjent/statsløs"}: Props) => {
    const {t} = useTranslation("skjema");
    return (
        <div>
            <Heading level={"3"} size={"small"} spacing>
                {t("kontakt.system.personalia.sporsmal")}
            </Heading>
            <Systeminfo>
                <SysteminfoItem label={t("kontakt.system.personalia.navn")}>{navn?.fulltNavn}</SysteminfoItem>
                <SysteminfoItem label={t("kontakt.system.personalia.fnr")}>
                    {formatFodselsnummer(fodselsnummer ?? "")}
                </SysteminfoItem>
                <SysteminfoItem label={t("kontakt.system.personalia.statsborgerskap")}>
                    {statsborgerskap}
                </SysteminfoItem>
                <BodyShort className={"pt-3"}>{t("kontakt.system.personalia.infotekst.tekst")}</BodyShort>
            </Systeminfo>
        </div>
    );
};

export const BasisPersonalia = () => {
    const behandlingsId = useBehandlingsId();
    const {data: isNyDatamodell, isPending} = useIsNyDatamodell(behandlingsId);
    const {expectOK: expectOkNew} = useAlgebraic(
        useGetBasisPersonalia(behandlingsId, {query: {enabled: isNyDatamodell === true}})
    );
    const {expectOK: expectOkOld} = useAlgebraic(
        useHentBasisPersonalia(behandlingsId, {query: {enabled: isNyDatamodell === false}})
    );

    if (isPending) {
        return <TextPlaceholder lines={1} />;
    }

    if (isNyDatamodell === true) {
        return expectOkNew((props) => <Personalia {...props} />);
    } else if (isNyDatamodell === false) {
        return expectOkOld((props) => <Personalia {...props} />);
    } else {
        return null;
    }
};
