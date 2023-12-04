import {Heading, Link, Loader, TextField} from "@navikt/ds-react";
import Downshift from "downshift";
import {useState} from "react";
import {useDebounce} from "react-use";
import styled from "styled-components";
import {fetchToJson} from "../../../lib/utils/rest-utils";

import {formaterAdresseString, removeDuplicatesAfterTransform} from "./AdresseUtils";
import {AdresseForslag} from "../../../generated/model";
import * as React from "react";
import {useTranslation} from "react-i18next";

const searchForAddress = async (value: string): Promise<AdresseForslag[]> => {
    try {
        const adresser = await fetchToJson<AdresseForslag[]>("informasjon/adressesok?sokestreng=" + encodeURI(value));
        return Promise.resolve(removeDuplicatesAfterTransform(adresser, formaterAdresseString).slice(0, 8));
    } catch (err) {
        return Promise.resolve([]);
    }
};

interface FetchAddressProps {
    searchvalue: string | null;
    children(state: {isLoading: boolean; isError: boolean; result: AdresseForslag[]}): JSX.Element;
}

const DEBOUNCE_TIMEOUT_MS = 400;

const FetchAddress = (props: FetchAddressProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [result, setResult] = useState<AdresseForslag[]>([]);

    useDebounce(
        () => {
            setIsLoading(true);
            setIsError(false);
            setResult([]);
            searchForAddress(props.searchvalue ?? "")
                .then((res) => {
                    setResult(res);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                    setIsError(true);
                    setResult([]);
                });
        },
        DEBOUNCE_TIMEOUT_MS,
        [props.searchvalue]
    );

    return props.children({isLoading, isError, result});
};

const SelectMenu = styled.ul`
    position: absolute;
    z-index: 3;

    margin-top: 0;

    box-sizing: border-box;
    width: 25rem;
    border: 1px solid var(--a-border-default);
    border-radius: var(--a-spacing-2);
    background-color: var(--a-surface-default);

    list-style: none;
    padding: 0.5rem 0;

    @media only screen and (max-width: 565px) {
        width: 100%;
    }
`;

const Item = styled.li<{isHighlighted: boolean}>`
    padding: 0.25rem 0.5rem;

    color: ${(props) => (props.isHighlighted ? "var(--a-surface-default)" : "inherit")};
    background-color: ${(props) => (props.isHighlighted ? "var(--a-blue-400)" : "inherit")};
`;

export const AdresseTypeahead = ({
    defaultValue,
    onChange,
}: {
    defaultValue?: string;
    onChange: (adresse: AdresseForslag | null | undefined) => void;
}) => {
    const {t} = useTranslation("skjema");

    return (
        <Downshift onSelect={onChange} itemToString={formaterAdresseString} initialInputValue={defaultValue}>
            {({getLabelProps, getInputProps, getItemProps, getMenuProps, highlightedIndex, inputValue, isOpen}) => (
                <div>
                    <label className={"space-y-4"} {...getLabelProps()}>
                        <div>
                            <Heading size={"xsmall"}>{t("kontakt.system.oppholdsadresse.hvorOppholder")}</Heading>
                            {t("kontakt.system.kontaktinfo.infotekst.tekst")}
                        </div>
                        <div>
                            {t("kontakt.system.kontaktinfo.infotekst.ekstratekst")}{" "}
                            <a href="https://www.nav.no/sok-nav-kontor">
                                {t("kontakt.system.kontaktinfo.infotekst.navsearch")}
                            </a>
                        </div>
                    </label>
                    <TextField {...getInputProps()} />
                    {isOpen && (
                        <FetchAddress searchvalue={inputValue}>
                            {({isLoading, isError, result}) => (
                                <>
                                    {isLoading && (
                                        <SelectMenu>
                                            <Item isHighlighted={false}>
                                                <Loader />
                                            </Item>
                                        </SelectMenu>
                                    )}
                                    {isError && <p>Det har oppstått en feil :(</p>}
                                    {result.length > 0 && (
                                        <SelectMenu {...getMenuProps()}>
                                            {result.map((adresse: AdresseForslag, index: number) => {
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
