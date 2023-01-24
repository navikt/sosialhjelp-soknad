import {Organisasjon, SkattbarInntekt} from "./inntektTypes";
import * as React from "react";
import {FormattedMessage, FormattedNumber} from "react-intl";
import Dato from "../../../../nav-soknad/components/tidspunkt/Dato";
import {UndertekstBold} from "nav-frontend-typografi";
import {Link} from "@navikt/ds-react";

function getLenkeSti(organisasjon: Organisasjon): string {
    let orgnr = organisasjon.orgnr ? "/" + organisasjon.orgnr : "";
    let year = organisasjon.tom!.slice(0, 4);
    let month = organisasjon.tom!.slice(5, 7);
    return `https://skatt.skatteetaten.no/web/innsynamelding/inntekt${orgnr}?year=${year}&month=${month}`;
}

function getUtbetalingVerdi(key: string, value: number, index: number) {
    return (
        <div key={`${key}-${index}`} className="utbetaling">
            <span>
                <FormattedMessage id={key} defaultMessage={key} />:
            </span>
            <span className="verdi detaljeliste__verdi">
                <FormattedNumber value={value} minimumFractionDigits={2} maximumFractionDigits={2} /> kr
            </span>
        </div>
    );
}

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
                                            getUtbetalingVerdi("Bruttoinntekt", utbetaling.brutto, index)
                                        );
                                    }
                                    if (utbetaling.forskuddstrekk) {
                                        utbetalingVerdier.push(
                                            getUtbetalingVerdi("Forskuddstrekk", utbetaling.forskuddstrekk, index)
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
