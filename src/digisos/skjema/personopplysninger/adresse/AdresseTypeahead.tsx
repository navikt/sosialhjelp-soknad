import Downshift from "downshift";
import {Input} from "nav-frontend-skjema";
import NavFrontendSpinner from "nav-frontend-spinner";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {erLocalhost, fetchToJson} from "../../../../nav-soknad/utils/rest-utils";
import {AdressesokTreff} from "./AdresseTypes";
import {formaterAdresseString, removeDuplicatesAfterTransform} from "./AdresseUtils";

const json = `[{"adresse":"Trondheimsveien","husnummer":"1","husbokstav":null,"kommunenummer":"5055","kommunenavn":"Heim","postnummer":"7200","poststed":"KYRKSÆTERØRA","geografiskTilknytning":"5055","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen","husnummer":"1","husbokstav":null,"kommunenummer":"3035","kommunenavn":"Eidsvoll","postnummer":"2072","poststed":"DAL","geografiskTilknytning":"3035","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen","husnummer":"1","husbokstav":null,"kommunenummer":"3420","kommunenavn":"Elverum","postnummer":"2406","poststed":"ELVERUM","geografiskTilknytning":"3420","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen","husnummer":"1","husbokstav":null,"kommunenummer":"3431","kommunenavn":"Dovre","postnummer":"2660","poststed":"DOMBÅS","geografiskTilknytning":"3431","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen - Kløfta","husnummer":"1","husbokstav":null,"kommunenummer":"3033","kommunenavn":"Ullensaker","postnummer":"2040","poststed":"KLØFTA","geografiskTilknytning":"3033","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsveien","husnummer":"1","husbokstav":null,"kommunenummer":"3031","kommunenavn":"Nittedal","postnummer":"1481","poststed":"HAGAN","geografiskTilknytning":"3031","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsveien","husnummer":"10","husbokstav":"B","kommunenummer":"0301","kommunenavn":"Oslo","postnummer":"0560","poststed":"OSLO","geografiskTilknytning":"030102","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen","husnummer":"10","husbokstav":null,"kommunenummer":"3431","kommunenavn":"Dovre","postnummer":"2660","poststed":"DOMBÅS","geografiskTilknytning":"3431","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen - Kløfta","husnummer":"10","husbokstav":null,"kommunenummer":"3033","kommunenavn":"Ullensaker","postnummer":"2040","poststed":"KLØFTA","geografiskTilknytning":"3033","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsveien","husnummer":"10","husbokstav":"A","kommunenummer":"3030","kommunenavn":"Lillestrøm","postnummer":"2013","poststed":"SKJETTEN","geografiskTilknytning":"3030","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsveien","husnummer":"10","husbokstav":"C","kommunenummer":"0301","kommunenavn":"Oslo","postnummer":"0560","poststed":"OSLO","geografiskTilknytning":"030102","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsveien","husnummer":"10","husbokstav":"B","kommunenummer":"3030","kommunenavn":"Lillestrøm","postnummer":"2013","poststed":"SKJETTEN","geografiskTilknytning":"3030","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsveien","husnummer":"10","husbokstav":"A","kommunenummer":"0301","kommunenavn":"Oslo","postnummer":"0560","poststed":"OSLO","geografiskTilknytning":"030102","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsveien","husnummer":"10","husbokstav":"D","kommunenummer":"0301","kommunenavn":"Oslo","postnummer":"0560","poststed":"OSLO","geografiskTilknytning":"030102","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen - Kløfta","husnummer":"100","husbokstav":null,"kommunenummer":"3033","kommunenavn":"Ullensaker","postnummer":"2040","poststed":"KLØFTA","geografiskTilknytning":"3033","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen - Jessheim","husnummer":"100","husbokstav":"A","kommunenummer":"3033","kommunenavn":"Ullensaker","postnummer":"2050","poststed":"JESSHEIM","geografiskTilknytning":"3033","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsveien","husnummer":"100","husbokstav":null,"kommunenummer":"0301","kommunenavn":"Oslo","postnummer":"0565","poststed":"OSLO","geografiskTilknytning":"030102","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen - Jessheim","husnummer":"100","husbokstav":"B","kommunenummer":"3033","kommunenavn":"Ullensaker","postnummer":"2050","poststed":"JESSHEIM","geografiskTilknytning":"3033","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen - Jessheim","husnummer":"100","husbokstav":"C","kommunenummer":"3033","kommunenavn":"Ullensaker","postnummer":"2050","poststed":"JESSHEIM","geografiskTilknytning":"3033","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsveien","husnummer":"101","husbokstav":null,"kommunenummer":"0301","kommunenavn":"Oslo","postnummer":"0565","poststed":"OSLO","geografiskTilknytning":"030102","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen","husnummer":"101","husbokstav":null,"kommunenummer":"3035","kommunenavn":"Eidsvoll","postnummer":"2072","poststed":"DAL","geografiskTilknytning":"3035","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen - Jessheim","husnummer":"1010","husbokstav":null,"kommunenummer":"3033","kommunenavn":"Ullensaker","postnummer":"2054","poststed":"MOGREINA","geografiskTilknytning":"3033","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen","husnummer":"1013","husbokstav":null,"kommunenummer":"3420","kommunenavn":"Elverum","postnummer":"2406","poststed":"ELVERUM","geografiskTilknytning":"3420","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen","husnummer":"1015","husbokstav":null,"kommunenummer":"3420","kommunenavn":"Elverum","postnummer":"2406","poststed":"ELVERUM","geografiskTilknytning":"3420","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen","husnummer":"1019","husbokstav":null,"kommunenummer":"3420","kommunenavn":"Elverum","postnummer":"2406","poststed":"ELVERUM","geografiskTilknytning":"3420","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen - Jessheim","husnummer":"102","husbokstav":"B","kommunenummer":"3033","kommunenavn":"Ullensaker","postnummer":"2050","poststed":"JESSHEIM","geografiskTilknytning":"3033","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsveien","husnummer":"102","husbokstav":"B","kommunenummer":"0301","kommunenavn":"Oslo","postnummer":"0565","poststed":"OSLO","geografiskTilknytning":"030102","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsveien","husnummer":"102","husbokstav":"A","kommunenummer":"0301","kommunenavn":"Oslo","postnummer":"0565","poststed":"OSLO","geografiskTilknytning":"030102","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsvegen - Jessheim","husnummer":"102","husbokstav":"A","kommunenummer":"3033","kommunenavn":"Ullensaker","postnummer":"2050","poststed":"JESSHEIM","geografiskTilknytning":"3033","gatekode":null,"bydel":null,"type":"gateadresse"},{"adresse":"Trondheimsveien","husnummer":"102","husbokstav":"C","kommunenummer":"0301","kommunenavn":"Oslo","postnummer":"0565","poststed":"OSLO","geografiskTilknytning":"030102","gatekode":null,"bydel":null,"type":"gateadresse"}]`;

/*const mockdata: AdressesokTreff[] = [
    {
        adresse: "Sannergata",
        husnummer: "2",
        kommunenavn: "Oslo",
        postnummer: "0101",
        husbokstav: null,
        kommunenummer: "0301",
        poststed: "OSLO",
        geografiskTilknytning: null,
        gatekode: null,
        bydel: null,
        type: "gateadresse",
    },
    {
        adresse: "Fyrstikkalleen",
        husnummer: "1",
        kommunenavn: "Oslo",
        postnummer: "0101",
        husbokstav: null,
        kommunenummer: null,
        poststed: null,
        geografiskTilknytning: null,
        gatekode: null,
        bydel: null,
        type: null,
    },
    {
        adresse: "Trondheimsveien",
        husnummer: "1",
        kommunenavn: "Oslo",
        postnummer: "0101",
        husbokstav: null,
        kommunenummer: null,
        poststed: null,
        geografiskTilknytning: null,
        gatekode: null,
        bydel: null,
        type: null,
    },
    {
        adresse: "Trondheimsveien",
        husnummer: "2",
        kommunenavn: "Oslo",
        postnummer: "0101",
        husbokstav: null,
        kommunenummer: null,
        poststed: null,
        geografiskTilknytning: null,
        gatekode: null,
        bydel: null,
        type: null,
    },
    {
        adresse: "Trondheimsveien",
        husnummer: "3",
        kommunenavn: "Oslo",
        postnummer: "0101",
        husbokstav: null,
        kommunenummer: null,
        poststed: null,
        geografiskTilknytning: null,
        gatekode: null,
        bydel: null,
        type: null,
    },
    {
        adresse: "Trondheimsveien",
        husnummer: "4",
        kommunenavn: "Oslo",
        postnummer: "0101",
        husbokstav: null,
        kommunenummer: null,
        poststed: null,
        geografiskTilknytning: null,
        gatekode: null,
        bydel: null,
        type: null,
    },
];*/

export const mockFetch = async (input: string): Promise<AdressesokTreff[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return await Promise.resolve(
        JSON.parse(json).filter((data: AdressesokTreff) =>
            formaterAdresseString(data)?.toLocaleLowerCase().includes(input.toLowerCase())
        )
    );
};

const searchForAddress = async (value: string): Promise<AdressesokTreff[]> => {
    try {
        const adresser = erLocalhost()
            ? await mockFetch(value)
            : await fetchToJson<AdressesokTreff[]>("informasjon/adressesok?sokestreng=" + encodeURI(value));
        return await Promise.resolve(removeDuplicatesAfterTransform(adresser, formaterAdresseString).slice(0, 8));
    } catch (err) {
        return await Promise.resolve([]);
    }
};

interface FetchAddressProps {
    searchvalue: string | null;
    children(state: {isLoading: boolean; isError: boolean; result: AdressesokTreff[]}): JSX.Element;
}

const FetchAddress = (props: FetchAddressProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [result, setResult] = useState<AdressesokTreff[]>([]);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);
        searchForAddress(props.searchvalue ?? "")
            .then((res) => {
                setResult(res);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsError(true);
            });
    }, [props.searchvalue]);

    return props.children({isLoading, isError, result});
};

const SelectMenu = styled.ul`
    position: absolute;
    z-index: 3;

    margin-top: 0rem;

    box-sizing: border-box;
    width: 25rem;
    border: 1px solid var(--navds-color-gray-40);
    border-radius: var(--navds-spacing-2);
    background-color: var(--navds-color-white);

    list-style: none;
    padding: 0.5rem 0;

    @media only screen and (max-width: 565px) {
        width: 100%;
    }
`;

const Item = styled.li<{isHighlighted: boolean}>`
    padding: 0.25rem 0.5rem;

    color: ${(props) => (props.isHighlighted ? "var(--navds-color-white)" : "inherit")};
    background-color: ${(props) => (props.isHighlighted ? "var(--navds-color-blue-40)" : "inherit")};
`;

const StyledInput = styled(Input)`
    margin-top: 1rem;
    margin-bottom: 0rem !important;
    width: 25rem;

    @media only screen and (max-width: 565px) {
        width: 100%;
    }
`;

export const AdresseTypeahead = (props: {
    valgtAdresse?: string;
    onNullstill: () => void;
    onVelgAnnenAdresse: (adresse: AdressesokTreff) => void;
}) => {
    const onSelect = (adresse?: AdressesokTreff) => {
        if (adresse === undefined) {
            console.log("Nullstiller");
            props.onNullstill();
        } else {
            props.onVelgAnnenAdresse(adresse);
        }
    };
    return (
        <Downshift
            onSelect={(adresse) => {
                onSelect(adresse);
            }}
            itemToString={(adresse) => formaterAdresseString(adresse ?? "") ?? ""}
            initialInputValue={props.valgtAdresse}
        >
            {({getLabelProps, getInputProps, getItemProps, getMenuProps, highlightedIndex, inputValue, isOpen}) => (
                <div>
                    <label {...getLabelProps()} />
                    <StyledInput {...getInputProps()} />
                    {isOpen && (
                        <FetchAddress searchvalue={inputValue}>
                            {({isLoading, result}) => (
                                <>
                                    {isLoading && (
                                        <SelectMenu>
                                            <Item isHighlighted={false}>
                                                <NavFrontendSpinner />
                                            </Item>
                                        </SelectMenu>
                                    )}
                                    {result.length > 0 && (
                                        <SelectMenu {...getMenuProps()}>
                                            {result.map((adresse: AdressesokTreff, index: number) => {
                                                return (
                                                    <Item
                                                        isHighlighted={index === highlightedIndex}
                                                        key={formaterAdresseString(adresse)}
                                                        {...getItemProps({item: adresse, index})}
                                                    >
                                                        {formaterAdresseString(adresse)}
                                                    </Item>
                                                );
                                            })}
                                        </SelectMenu>
                                    )}
                                </>
                            )}
                        </FetchAddress>
                    )}
                </div>
            )}
        </Downshift>
    );
};
