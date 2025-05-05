import * as React from "react";
import {Loader} from "@navikt/ds-react";
import {TelefonData} from "./telefon/TelefonData.tsx";
import {useTelefonnummerAPI} from "../../lib/hooks/data/useTelefonnummerAPI.ts";

export const PersondataTelefon = () => {
    const {isLoading, setTelefonnummer, telefonnummer} = useTelefonnummerAPI();

    return !telefonnummer ? (
        isLoading && <Loader />
    ) : (
        <TelefonData setTelefonnummer={setTelefonnummer} telefonnummer={telefonnummer} />
    );
};
