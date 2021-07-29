import Downshift from "downshift";
import {Input} from "nav-frontend-skjema";
import NavFrontendSpinner from "nav-frontend-spinner";
import {useEffect, useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getIntlTextOrKey} from "../../../../nav-soknad/utils";
import {erLocalhost, fetchToJson} from "../../../../nav-soknad/utils/rest-utils";
import {AdressesokTreff} from "./AdresseTypes";
import {formaterAdresseString, removeDuplicatesAfterTransform} from "./AdresseUtils";

const mockdata: AdressesokTreff[] = [
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
];

const mockFetch = async (input: string): Promise<AdressesokTreff[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await Promise.resolve(mockdata.filter((data) => data.adresse?.includes(input)));
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
    children(state: {isLoading: boolean; isError: boolean; result: any}): JSX.Element;
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

    console.log("result", result);
    return props.children({isLoading, isError, result});
};

export const AddresseTypeahead = (props: {
    valgtAdresse?: string;
    onVelgAnnenAdresse: (adresse: AdressesokTreff) => void;
    onNullstill: () => void;
}) => {
    const intl = useIntl();
    return (
        <Downshift
            onSelect={(adresse) => props.onVelgAnnenAdresse(adresse)}
            itemToString={(adresse) => formaterAdresseString(adresse ?? "") ?? ""}
            initialInputValue={props.valgtAdresse}
        >
            {({getLabelProps, getInputProps, getItemProps, getMenuProps, highlightedIndex, inputValue, isOpen}) => (
                <div>
                    <Sporsmal
                        tittelRenderer={() => getIntlTextOrKey(intl, "kontakt.system.oppholdsadresse.hvorOppholder")}
                        legendTittelStyle={LegendTittleStyle.FET_NORMAL}
                        {...getLabelProps()}
                    >
                        <div style={{marginBottom: "1rem"}}>
                            <FormattedMessage id="kontakt.system.kontaktinfo.infotekst.tekst" />
                        </div>
                        <FormattedMessage id="kontakt.system.kontaktinfo.infotekst.ekstratekst" />

                        <Input {...getInputProps()} />
                        {isOpen && (
                            <FetchAddress searchvalue={inputValue}>
                                {({isLoading, result}) => (
                                    <div>
                                        {isLoading && <NavFrontendSpinner />}
                                        <ul {...getMenuProps()}>
                                            {result?.map((adresse: any, index: number) => {
                                                return (
                                                    <li key={adresse.adresse} {...getItemProps({item: adresse, index})}>
                                                        {formaterAdresseString(adresse)}
                                                        {index === highlightedIndex && <b>MARKERT</b>}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </FetchAddress>
                        )}
                    </Sporsmal>
                </div>
            )}
        </Downshift>
    );
};
