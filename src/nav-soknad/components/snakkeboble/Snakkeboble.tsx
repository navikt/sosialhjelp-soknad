import EllaBlunk from "../animasjoner/ellaBlunk";
import * as React from "react";
import {BodyShort, Label} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

const Snakkeboble = ({fornavn}: {fornavn?: string}) => {
    const {t} = useTranslation("skjema");

    return (
        <div className="mb-4 flex flex-col items-center">
            <div className="p-8 lg:ml-20 max-w-[360px] rounded-lg bg-gradient-to-b from-digisosGronnBakgrunnTop to-digisosGronnBakgrunnBottom">
                {fornavn?.length && <Label spacing>{t("informasjon.hilsen.hei", {fornavn})}</Label>}
                <BodyShort>{t("informasjon.hilsen.tittel")}</BodyShort>
            </div>
            <div className={"flex justify-center pl-24 -mb-2"}>
                <div
                    className={"border-transparent border-t-digisosGronnBakgrunnBottom w-0 h-0"}
                    aria-hidden="true"
                    style={{
                        borderStyle: "solid",
                        borderWidth: "16px 18px 0 0",
                    }}
                />
            </div>
            <EllaBlunk size={"190"} />
        </div>
    );
};
export default Snakkeboble;
