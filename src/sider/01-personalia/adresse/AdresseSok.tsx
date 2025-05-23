import {AdresseForslag} from "../../../generated/model";
import {AdresseTypeahead} from "./AdresseTypeaheadDownshift";
import * as React from "react";
import styled from "styled-components";
import {AdresserInputBrukerAdresse} from "../../../generated/new/model";

// TODO: Make this unnecessary by making the input type on the backend to soknad
//       equal to the output type from adressesok
export const adresseForslagTilAdresse = ({adresse, ...rest}: AdresseForslag): AdresserInputBrukerAdresse => ({
    ...rest,
    type: "VegAdresse",
    gatenavn: adresse,
    adresselinjer: [],
    landkode: "NO",
});

const Triangle = styled.div`
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 12px 1rem 12px;
    border-color: transparent;
`;

export const AdresseSok = ({
    defaultValue,
    onChange,
    className,
}: {
    className?: string;
    defaultValue?: string;
    onChange: (nyAdresse: AdresserInputBrukerAdresse | null) => void;
}) => {
    return (
        <div className={className}>
            <Triangle className={"border-b-blue-50! ml-4"} />
            <div className={"space-y-4 bg-blue-50 rounded-lg p-4 pt-3 shadow-lg"}>
                <AdresseTypeahead
                    defaultValue={defaultValue}
                    onChange={async (adresse) => onChange(adresse ? adresseForslagTilAdresse(adresse) : null)}
                />
            </div>
        </div>
    );
};
