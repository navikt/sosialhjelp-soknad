import * as React from "react";
import {useTranslation} from "react-i18next";
import {Checkbox, CheckboxGroup} from "@navikt/ds-react";
import {YesNoInput} from "../../lib/components/form/YesNoInput";
import {BarneutgifterFrontend} from "../../generated/model";
import {useBarneutgifter} from "../../lib/hooks/data/useBarneutgifter";

export const Barneutgifter = () => {
    const {barneutgifter, setBarneutgifter, setBekreftelse} = useBarneutgifter();
    const {t} = useTranslation("skjema");

    if (!barneutgifter || !barneutgifter.harForsorgerplikt) return null;

    return (
        <div className={"space-y-2"}>
            <YesNoInput
                legend={t("utgifter.barn.sporsmal")}
                description={t("utgifter.barn.infotekst.tekst")}
                onChange={setBekreftelse}
                name={"bekreftelse"}
                defaultValue={barneutgifter.bekreftelse}
            />
            {barneutgifter.bekreftelse && (
                <CheckboxGroup
                    legend={t("utgifter.barn.true.utgifter.sporsmal")}
                    onChange={(navn: (keyof Omit<BarneutgifterFrontend, "bekreftelse" | "harForsorgerplikt">)[]) =>
                        setBarneutgifter(navn)
                    }
                    value={Object.keys(barneutgifter).filter(
                        (key) => barneutgifter[key as keyof BarneutgifterFrontend]
                    )}
                >
                    <Checkbox value={"fritidsaktiviteter"}>
                        {t("utgifter.barn.true.utgifter.fritidsaktiviteter")}
                    </Checkbox>
                    <Checkbox value={"barnehage"}>{t("utgifter.barn.true.utgifter.barnehage")}</Checkbox>
                    <Checkbox value={"sfo"}>{t("utgifter.barn.true.utgifter.sfo")}</Checkbox>
                    <Checkbox value={"tannregulering"}>{t("utgifter.barn.true.utgifter.tannregulering")}</Checkbox>
                    <Checkbox value={"annet"}>{t("utgifter.barn.true.utgifter.annet")}</Checkbox>
                </CheckboxGroup>
            )}
        </div>
    );
};
