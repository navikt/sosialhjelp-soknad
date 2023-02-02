import EllaBlunk from "../animasjoner/ellaBlunk";
import * as React from "react";
import {BodyShort, Label} from "@navikt/ds-react";
import {FormattedMessage} from "react-intl";
import {useTranslation} from "react-i18next";

const Snakkeboble = ({fornavn}: {fornavn?: string}) => {
    const {t} = useTranslation("skjema");

    return (
        <div className="mb-4 flex flex-col items-center">
            <div className="p-8 lg:ml-20 max-w-[360px] rounded-lg bg-[#CCF1D6]">
                {fornavn?.length && (
                    <Label spacing>
                        <FormattedMessage id="informasjon.hilsen.hei" values={{fornavn}} />
                    </Label>
                )}
                <BodyShort>{t("informasjon.hilsen.tittel")}</BodyShort>
            </div>
            <div className={"flex justify-center pl-24 -mb-2"}>
                <div
                    aria-hidden="true"
                    style={{
                        width: "0",
                        height: "0",
                        borderStyle: "solid",
                        borderWidth: "16px 18px 0 0",
                        borderColor: "#CCF1D6 transparent transparent transparent",
                    }}
                />
            </div>
            <EllaBlunk size={"190"} />
        </div>
    );
};
export default Snakkeboble;
