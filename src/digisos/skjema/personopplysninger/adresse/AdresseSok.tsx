import {AdresseForslag, AdresseFrontend} from "../../../../generated/model";
import {Heading} from "@navikt/ds-react";
import {AdresseTypeahead} from "./AdresseTypeaheadDownshift";
import * as React from "react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

// TODO: Make this unnecessary by making the input type on the backend to soknad
//       equal to the output type from adressesok
export const adresseForslagTilAdresse = ({
    adresse,
    husbokstav,
    husnummer,
    kommunenummer,
    postnummer,
    poststed,
}: AdresseForslag): AdresseFrontend => ({
    type: "gateadresse",
    gateadresse: {
        gatenavn: adresse,
        husbokstav,
        husnummer,
        kommunenummer,
        postnummer,
        poststed,
    },
});

const Triangle = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 10px 1rem 10px;
    border-color: transparent;
`;

export const AdresseSok = ({
    defaultValue,
    onChange,
    className,
}: {
    className?: string;
    defaultValue?: string;
    onChange: (nyAdresse: AdresseFrontend | null) => Promise<void>;
}) => {
    const {t} = useTranslation("skjema");

    return (
        <div className={className}>
            <Triangle className={"!border-b-gray-200 ml-5"} />
            <div className={"space-y-4 bg-gray-200 rounded-lg p-4 pt-3"}>
                <div>
                    <Heading size={"xsmall"}>{t("kontakt.system.oppholdsadresse.hvorOppholder")}</Heading>
                    {t("kontakt.system.kontaktinfo.infotekst.tekst")}
                </div>
                <div>{t("kontakt.system.kontaktinfo.infotekst.ekstratekst")}</div>
                <AdresseTypeahead
                    defaultValue={defaultValue}
                    onVelgAnnenAdresse={async (forslag) => onChange(adresseForslagTilAdresse(forslag))}
                    onNullstill={async () => onChange(null)}
                />
            </div>
        </div>
    );
};
