import {Organisasjon, SkattbarInntekt} from "./inntektTypes";
import * as React from "react";
import {FormattedDate, FormattedMessage, FormattedNumber} from "react-intl";

function getLenkeSti(organisasjon: Organisasjon): string {
    let orgnr = organisasjon.orgnr ? "/" + organisasjon.orgnr : "";
    let year = organisasjon.tom!.slice(0, 4);
    let month = organisasjon.tom!.slice(5, 7);
    return `https://skatt.skatteetaten.no/web/innsynamelding/inntekt${orgnr}?year=${year}&month=${month}`;
}

function getUtbetalingVerdi(key: string, value: number, index: number) {
    return (<div key={`${key}-${index}`} className="utbetaling">
        <span><FormattedMessage id={key}/>:</span>
        <span className="verdi detaljeliste__verdi">
            <FormattedNumber
                value={value}
                minimumFractionDigits={2}
                maximumFractionDigits={2}/> kr
        </span>
    </div>);
}

type SkattbartForskuddProps = { skattbarinntektogforskuddstrekk: SkattbarInntekt[] };

const SkattbarinntektForskuddstrekk: React.FC<SkattbartForskuddProps> = ({ skattbarinntektogforskuddstrekk }) => {
    return (
        <span>
            {skattbarinntektogforskuddstrekk.map((skattbarInntekt: SkattbarInntekt) => {
                return (
                    skattbarInntekt.organisasjoner.map((organisasjon: Organisasjon) => {
                        const fom = <FormattedDate value={organisasjon.fom!}/>;
                        const tom = <FormattedDate value={organisasjon.tom!}/>;
                        const lenkeSti = getLenkeSti(organisasjon);
                        return (
                            <div key={organisasjon.orgnr} className="utbetaling blokk">
                                <div className="blokk-s">
                                    <h4 className="blokk-null">{organisasjon.organisasjonsnavn}</h4>
                                    <div>Fra {fom} til {tom}</div>
                                </div>
                                <div className="blokk-xs">
                                    {organisasjon.utbetalinger.map((utbetaling, index) => {
                                        let utbetalingVerdier = [];
                                        if (utbetaling.brutto) {
                                            utbetalingVerdier.push(getUtbetalingVerdi("Bruttoinntekt", utbetaling.brutto, index));
                                        }
                                        if (utbetaling.forskuddstrekk) {
                                            utbetalingVerdier.push(getUtbetalingVerdi("Forskuddstrekk", utbetaling.forskuddstrekk, index));
                                        }
                                        return utbetalingVerdier;
                                    })}
                                </div>
                                <a className="blokk-s" href={lenkeSti} target="_blank" rel="noopener noreferrer">
                                    Se detaljer hos Skatteetaten.</a>
                            </div>
                        );
                    })
                )
            })}
        </span>);
};

export default SkattbarinntektForskuddstrekk;
