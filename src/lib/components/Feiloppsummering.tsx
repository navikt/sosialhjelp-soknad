import {Alert, Heading} from "@navikt/ds-react";
import {Valideringsfeil} from "../validering";
import React from "react";
import {useTranslation} from "react-i18next";

const Feiloppsummering = ({valideringsfeil}: {valideringsfeil?: Valideringsfeil[]}) => {
    const {t} = useTranslation("skjema");

    if (!valideringsfeil?.length) return null;

    return (
        <Alert variant={"error"} tabIndex={-1} className={"!mb-8"}>
            <Heading size={"small"} level={"3"} className="feiloppsummering__tittel blokk-s">
                Det er {valideringsfeil ? valideringsfeil.length : 1} feil i skjemaet
            </Heading>
            {valideringsfeil?.map((feilmld, index) => <div key={index}>{t(feilmld.feilkode)}</div>)}
        </Alert>
    );
};

export default Feiloppsummering;
