import {Alert, Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useValideringContext} from "../providers/useValideringContext.ts";

const Feiloppsummering = () => {
    const {t} = useTranslation("skjema");
    const {
        state: {feil, visValideringsfeil},
    } = useValideringContext();
    if (!visValideringsfeil || !feil?.length) return null;

    return (
        <Alert variant={"error"} tabIndex={-1} className={"!mb-8"}>
            <Heading size={"small"} level={"3"} className="feiloppsummering__tittel blokk-s">
                Det er {feil ? feil.length : 1} feil i skjemaet
            </Heading>
            {feil?.map((feilmld, index) => <div key={index}>{t(feilmld.feilkode)}</div>)}
        </Alert>
    );
};

export default Feiloppsummering;
