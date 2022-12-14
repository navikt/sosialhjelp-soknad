import EllaBlunk from "../animasjoner/ellaBlunk";
import * as React from "react";
import {BodyShort, Label} from "@navikt/ds-react";
import {FormattedMessage} from "react-intl";

const Snakkeboble = ({fornavn}: {fornavn?: string}) => (
    <div className="relative max-w-lg mb-4 mx-auto">
        <div className="p-4 rounded-lg bg-[#cde7d8] leading-6 relative z-30">
            {fornavn?.length && (
                <Label spacing>
                    <FormattedMessage id="informasjon.hilsen.hei" values={{fornavn}} />
                </Label>
            )}
            <BodyShort>
                <FormattedMessage id="informasjon.hilsen.tittel" />
            </BodyShort>
        </div>
        <div className={"flex justify-center pl-24"}>
            <EllaBlunk size={"175"} />
            <div
                aria-hidden="true"
                style={{
                    width: "0",
                    height: "0",
                    marginRight: "10px",
                    borderStyle: "solid",
                    borderWidth: "35px 50px 0 0",
                    borderColor: "#cde7d8 transparent transparent transparent",
                }}
            />
        </div>
    </div>
);

export default Snakkeboble;
