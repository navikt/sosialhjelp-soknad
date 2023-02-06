import {Organisasjon, SkattbarInntekt} from "./inntektTypes";
import * as React from "react";
import Dato from "../../../../nav-soknad/components/tidspunkt/Dato";
import {UndertekstBold} from "nav-frontend-typografi";
import {Link} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {fmtCurrency} from "../../../../lib/fmtCurrency";

function getLenkeSti(organisasjon: Organisasjon): string {
    let orgnr = organisasjon.orgnr ? "/" + organisasjon.orgnr : "";
    let year = organisasjon.tom!.slice(0, 4);
    let month = organisasjon.tom!.slice(5, 7);
    return `https://skatt.skatteetaten.no/web/innsynamelding/inntekt${orgnr}?year=${year}&month=${month}`;
}

const UtbetalingVerdi = ({description, value}: {description: string; value: number}) => {
    const {t, i18n} = useTranslation();

    return (
        <div className="flex justify-between">
            <div>{t(description)}:</div>
            <div>{fmtCurrency(i18n.language, value)}</div>
        </div>
    );
};

type SkattbartForskuddProps = {skattbarinntektogforskuddstrekk: SkattbarInntekt[]};

const SkattbarinntektForskuddstrekk: React.FC<SkattbartForskuddProps> = ({skattbarinntektogforskuddstrekk}) => {
    return (
        <span>
            {skattbarinntektogforskuddstrekk.map((skattbarInntekt: SkattbarInntekt) => {
                return skattbarInntekt.organisasjoner.map((organisasjon: Organisasjon) => {
                    const fom = <Dato>{organisasjon.fom!}</Dato>;
                    const tom = <Dato>{organisasjon.tom!}</Dato>;
                    const lenkeSti = getLenkeSti(organisasjon);
                    return (
                        <div key={organisasjon.orgnr} className="utbetaling blokk">
                            <div className="blokk-s">
                                <UndertekstBold className="blokk-null">{organisasjon.organisasjonsnavn}</UndertekstBold>
                                <div>
                                    Fra {fom} til {tom}
                                </div>
                            </div>
                            <div className="blokk-xs">
                                {organisasjon.utbetalinger.map((utbetaling, index) => {
                                    let utbetalingVerdier = [];
                                    if (utbetaling.brutto) {
                                        utbetalingVerdier.push(
                                            <UtbetalingVerdi
                                                description={"Bruttoinntekt"}
                                                value={utbetaling.brutto}
                                                key={`Bruttoinntekt-${index}`}
                                            />
                                        );
                                    }
                                    if (utbetaling.forskuddstrekk) {
                                        utbetalingVerdier.push(
                                            <UtbetalingVerdi
                                                description={"Forskuddstrekk"}
                                                value={utbetaling.forskuddstrekk}
                                                key={`Forskuddstrekk-${index}`}
                                            />
                                        );
                                    }
                                    return utbetalingVerdier;
                                })}
                            </div>
                            <Link href={lenkeSti} target="_blank" rel="noopener noreferrer">
                                Se detaljer hos Skatteetaten.
                            </Link>
                        </div>
                    );
                });
            })}
        </span>
    );
};

export default SkattbarinntektForskuddstrekk;
