import {Heading, Loader, TextField} from "@navikt/ds-react";
import Downshift from "downshift";
import {useState} from "react";
import {useDebounce} from "react-use";
import styled from "styled-components";

import {formaterAdresseString} from "./AdresseUtils";
import {AdresseForslag} from "../../../generated/model";
import * as React from "react";
import {Trans, useTranslation} from "react-i18next";
import {useAdresseSok} from "../../../generated/informasjon-controller/informasjon-controller.ts";
import {UseQueryResult} from "@tanstack/react-query";

type AdresseSokChildProps = Pick<UseQueryResult<AdresseForslag[]>, "isPending" | "data">;

interface FetchAddressProps {
    searchvalue: string | null;
    isOpen: boolean;
    children(state: AdresseSokChildProps): JSX.Element;
}

const DEBOUNCE_TIMEOUT_MS = 400;

const FetchAddress = ({children, searchvalue, isOpen}: FetchAddressProps) => {
    const [sokestreng, setSokestreng] = useState<string>("");
    const queryTooShort = (sokestreng?.length ?? 0) < 3;
    const {data, isPending, isError} = useAdresseSok({sokestreng}, {query: {enabled: !queryTooShort}});
    useDebounce(() => setSokestreng(searchvalue ?? ""), DEBOUNCE_TIMEOUT_MS, [searchvalue]);

    if (!isOpen) return null;
    if (isError) return <div>Vi beklager, en feil har oppstått</div>;
    return children({isPending: isPending && !queryTooShort, data});
};

const SelectMenu = styled.ul`
    position: relative;
    z-index: 3;
    border: 1px solid var(--a-border-default);
    border-radius: var(--a-spacing-2);
    background-color: var(--a-surface-default);
    padding: 0.5rem 0;
    width: 100%;
`;

const Item = styled.li<{$isHighlighted: boolean}>`
    padding: 0.25rem 0.5rem;

    color: ${(props) => (props.$isHighlighted ? "var(--a-surface-default)" : "inherit")};
    background-color: ${(props) => (props.$isHighlighted ? "var(--a-blue-400)" : "inherit")};
`;

const AdressesokHeading = () => {
    const {t, i18n} = useTranslation("skjema");
    const baseUrl = "https://www.nav.no/sok-nav-kontor";
    const href = i18n.language === "nb" ? baseUrl : `${baseUrl}/${i18n.language}`;
    return (
        <>
            <div>
                <Heading size={"xsmall"}>{t("kontakt.system.oppholdsadresse.hvorOppholder")}</Heading>
            </div>
            <Trans
                t={t}
                i18nKey={"kontakt.system.kontaktinfo.infotekst.ekstratekst"}
                components={{
                    lenke: (
                        <a href={href} target="_blank" rel="noreferrer">
                            {null}
                        </a>
                    ),
                }}
            />
        </>
    );
};

export const AdresseTypeahead = ({
    defaultValue,
    onChange,
}: {
    defaultValue?: string;
    onChange: (adresse: AdresseForslag | null | undefined) => void;
}) => (
    <Downshift onSelect={onChange} itemToString={formaterAdresseString} initialInputValue={defaultValue}>
        {({getLabelProps, getInputProps, getItemProps, getMenuProps, highlightedIndex, inputValue, isOpen}) => (
            <div>
                <label className={"space-y-4"} {...getLabelProps()}>
                    <AdressesokHeading />
                </label>
                <TextField {...getInputProps()} />
                <FetchAddress isOpen={isOpen} searchvalue={inputValue}>
                    {({isPending, data}) => (
                        <SelectMenu {...getMenuProps()}>
                            {isPending ? (
                                <Item $isHighlighted={false}>
                                    <Loader />
                                </Item>
                            ) : (
                                data?.map((item, index: number) => (
                                    <Item
                                        $isHighlighted={index === highlightedIndex}
                                        key={index}
                                        {...getItemProps({item, index})}
                                    >
                                        {formaterAdresseString(item)}
                                    </Item>
                                ))
                            )}
                        </SelectMenu>
                    )}
                </FetchAddress>
            </div>
        )}
    </Downshift>
);
