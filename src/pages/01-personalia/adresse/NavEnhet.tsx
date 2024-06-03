import * as React from "react";
import {Alert, BodyShort, Heading, Link} from "@navikt/ds-react";
import {NavEnhetFrontend} from "../../../generated/model";
import {Trans, useTranslation} from "react-i18next";
import {erAktiv} from "../../../lib/navEnhetStatus";
import {useNorgKontaktinformasjon} from "../../../lib/hooks/common/useNorgKontaktinformasjon";
import {formatTelefonnummer} from "@fremtind/jkl-formatters-util";

export const NavEnhetInaktiv = ({navEnhet}: {navEnhet?: NavEnhetFrontend}) => {
    const {t} = useTranslation();

    if (!navEnhet) return null;

    if (navEnhet.isMottakDeaktivert)
        return (
            <Alert variant="warning">
                <Trans
                    t={t}
                    i18nKey={"adresse.alertstripe.advarsel.v2"}
                    values={{kommuneNavn: navEnhet.kommunenavn ?? "Din"}}
                    components={{
                        lenke: (
                            <Link href="https://www.nav.no/start/okonomisk-sosialhjelp" target="_blank">
                                {null}
                            </Link>
                        ),
                    }}
                />
            </Alert>
        );

    if (navEnhet.isMottakMidlertidigDeaktivert)
        return (
            <Alert variant="error">
                <Trans
                    t={t}
                    i18nKey={"adresse.alertstripe.feil.v2"}
                    values={{kommuneNavn: navEnhet?.kommunenavn ?? "Din"}}
                    components={{
                        lenke: (
                            <Link href="https://www.nav.no/start/okonomisk-sosialhjelp" target="_blank">
                                {null}
                            </Link>
                        ),
                    }}
                />
            </Alert>
        );
    return null;
};
export const NavEnhet = ({navEnhet}: {navEnhet?: NavEnhetFrontend}) => {
    const {t} = useTranslation();
    if (!navEnhet) return null;
    const {enhetsnavn, kommunenavn} = navEnhet;

    if (!erAktiv(navEnhet)) return <NavEnhetInaktiv navEnhet={navEnhet} />;

    return (
        <Alert variant={"success"}>
            <Heading size={"small"} level={"4"} spacing>
                {t("adresse.alertstripe.suksess")}
            </Heading>
            <BodyShort>{t("adresse.alertstripe.navKontor", {enhetsnavn, kommunenavn})}</BodyShort>
        </Alert>
    );
};

export const NyNavEnhet = ({navEnhet}: {navEnhet?: NavEnhetFrontend}) => {
    const {data} = useNorgKontaktinformasjon("0312");
    if (!navEnhet) return null;
    const {kommunenavn} = navEnhet;
    return (
        <div className={"py-4"}>
            <Heading size={"small"} spacing level={"4"}>
                OBS: Prototype med testdata!
                <br />
                Din søknad blir behandlet av:
            </Heading>
            {data.kontakt.publikumsmottak.map(({besoeksadresse: {gatenavn, husnummer, husbokstav}, aapningstider}) => (
                <div className={"flex gap-3 pb-2"}>
                    <div className="basis-1/2 py-1">
                        <img alt="testbilde" src={"/sosialhjelp/soknad/navKontorBildeEksempel.png"} />
                    </div>
                    <div className={"space-y-2 py-2"}>
                        <Heading size={"xsmall"}>{data.enhet.navn}</Heading>

                        <div className={"h-adr"}>
                            <span className="p-street-address">
                                {gatenavn} {husnummer}
                                {husbokstav ? ` ${husbokstav}` : ""}
                            </span>
                            , <span className="p-locality">{kommunenavn}</span>
                        </div>
                        <div>Telefon: {formatTelefonnummer(data.kontakt.telefonnummer)}</div>
                        <div className={""}>
                            <div>Besøkstider:</div>
                            <table>
                                {aapningstider.map(({dag, fra, til}) => (
                                    <tr className={"leading-5"}>
                                        <th className={"font-normal text-left pr-1"}>{dag}: </th>
                                        <td>
                                            {fra}-{til}
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
