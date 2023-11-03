import * as React from "react";
import {TextPlaceholder} from "../../../lib/components/animasjoner/TextPlaceholder";
import {Alert, Detail, Heading, Link} from "@navikt/ds-react";
import {Trans, useTranslation} from "react-i18next";
import {NavYtelserTable} from "./NavYtelserTable";
import {useBehandlingsId} from "../../../lib/hooks/common/useBehandlingsId";
import {useHentSystemregistrerteInntekter} from "../../../generated/systemregistrert-inntekt-ressurs/systemregistrert-inntekt-ressurs";

const useNavYtelser = () => {
    const behandlingsId = useBehandlingsId();
    const {data, isLoading} = useHentSystemregistrerteInntekter(behandlingsId);

    return {systeminntekter: data?.systeminntekter, isError: data?.utbetalingerFraNavFeilet, isLoading};
};

export const NavYtelser = () => {
    const {t} = useTranslation("skjema");
    const {systeminntekter, isError, isLoading} = useNavYtelser();

    if (isLoading) return <TextPlaceholder lines={3} />;
    if (isError) return <Alert variant={"warning"}>{t("utbetalinger.kontaktproblemer")}</Alert>;

    return (
        <div className={"space-y-4"}>
            <Heading size="medium" level="2" spacing>
                {t("navytelser.sporsmal")}
            </Heading>
            <NavYtelserTable systeminntekter={systeminntekter} />
            <Detail>
                <Trans
                    t={t}
                    i18nKey={"utbetalinger.infotekst.tekst.v2"}
                    components={{
                        lenke: (
                            <Link href={t("utbetalinger.infotekst.tekst.url")} target="_blank">
                                {null}
                            </Link>
                        ),
                    }}
                />
            </Detail>
        </div>
    );
};
