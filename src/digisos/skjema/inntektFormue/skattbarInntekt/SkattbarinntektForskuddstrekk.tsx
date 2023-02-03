import {Organisasjon, SkattbarInntekt} from "./inntektTypes";
import * as React from "react";
import {FormattedNumber} from "react-intl";
import Dato from "../../../../nav-soknad/components/tidspunkt/Dato";
import {UndertekstBold} from "nav-frontend-typografi";
import {Link} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

function getLenkeSti(organisasjon: Organisasjon): string {
    let orgnr = organisasjon.orgnr ? "/" + organisasjon.orgnr : "";
    let year = organisasjon.tom!.slice(0, 4);
    let month = organisasjon.tom!.slice(5, 7);
    return `https://skatt.skatteetaten.no/web/innsynamelding/inntekt${orgnr}?year=${year}&month=${month}`;
}

const UtbetalingVerdi = ({key, value, index}: {key: string; value: number; index: number}) => {
    const {t} = useTranslation();

    return (
        <div key={`${key}-${index}`} className="utbetaling">
            <span>{t(key)}</span>
            <span className="verdi detaljeliste__verdi">
                <FormattedNumber value={value} minimumFractionDigits={2} maximumFractionDigits={2} /> kr
            </span>
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
                                                key={"Bruttoinntekt"}
                                                value={utbetaling.brutto}
                                                index={index}
                                            />
                                        );
                                    }
                                    if (utbetaling.forskuddstrekk) {
                                        utbetalingVerdier.push(
                                            <UtbetalingVerdi
                                                key={"Forskuddstrekk"}
                                                value={utbetaling.forskuddstrekk}
                                                index={index}
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
