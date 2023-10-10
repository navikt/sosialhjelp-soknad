import * as React from "react";
import {Detail, Link} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {fmtCurrency} from "../../../lib/fmtCurrency";
import TextPlaceholder from "../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {Organisasjon, SkattbarInntektOgForskuddstrekk, Utbetaling} from "../../../generated/model";
import {LocalizedDate} from "../../../components/LocalizedDate";
import i18next from "i18next";
import {format} from "date-fns";

const getLenkeSti = ({orgnr, tom}: Organisasjon): string => {
    const baseUrl = "https://skatt.skatteetaten.no/web/innsynamelding/inntekt";
    const url = new URL(orgnr ? `${baseUrl}/${orgnr}` : baseUrl);

    const tomDate = new Date(tom);

    const params = new URLSearchParams({
        year: format(tomDate, "yyyy"),
        month: format(tomDate, "MM"),
    });

    url.search = params.toString();

    return url.toString();
};

const UtbetalingsListe = ({utbetalinger}: {utbetalinger?: Utbetaling[]}) => {
    const {t} = useTranslation("skjema", {keyPrefix: "utbetalinger.inntekt.skattbar"});

    return (
        <div className="blokk-xs">
            {utbetalinger?.map(({brutto, forskuddstrekk: trekk}, i) => (
                <>
                    {brutto && <Betaling description={t("bruttoinntekt")} value={brutto} key={`${i}b`} />}
                    {trekk && <Betaling description={t("forskuddstrekk")} value={trekk} key={`${i}f`} />}
                </>
            ))}
        </div>
    );
};

const Betaling = ({description, value}: {description: string; value: number}) => (
    <div className="flex justify-between">
        <div>{description}:</div>
        <div>{fmtCurrency(i18next.language, value)}</div>
    </div>
);

type SkattbartForskuddProps = {
    inntektOgForskuddstrekk?: SkattbarInntektOgForskuddstrekk[];
};

// TODO: Vi må filtrere vekk entries der organisasjoner er null. Garantert bare rot i DTOen på backend.
const SkattbarinntektForskuddstrekk = ({inntektOgForskuddstrekk}: SkattbartForskuddProps) => {
    const {t} = useTranslation("skjema", {keyPrefix: "utbetalinger.inntekt"});

    if (!inntektOgForskuddstrekk) return <TextPlaceholder lines={3} />;

    return (
        <>
            {inntektOgForskuddstrekk.map(
                ({organisasjoner}) =>
                    organisasjoner?.map((org) => (
                        <div key={org.orgnr} className="utbetaling blokk">
                            <div className="blokk-s">
                                <Detail>{org.organisasjonsnavn}</Detail>
                                <div>
                                    {t("fra")} <LocalizedDate date={org.fom} /> {t("til")}{" "}
                                    <LocalizedDate date={org.tom} />
                                </div>
                            </div>
                            <UtbetalingsListe utbetalinger={org.utbetalinger} />
                            <Link href={getLenkeSti(org)} target="_blank" rel="noopener noreferrer">
                                {t("skattbar.skatteetaten")}
                            </Link>
                        </div>
                    ))
            )}
        </>
    );
};

export default SkattbarinntektForskuddstrekk;
