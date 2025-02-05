import * as React from "react";
import {Checkbox, CheckboxGroup, GuidePanel, Link} from "@navikt/ds-react";
import {Trans, useTranslation} from "react-i18next";
import {useBoutgifter} from "../../lib/hooks/data/useBoutgifter";
import {BoutgifterFrontend} from "../../generated/model";
import {useBosituasjon} from "../../lib/hooks/data/useBosituasjon.tsx";
import {useInntekterBostotte} from "../../lib/hooks/data/useInntekterBostotte.tsx";

export const Boutgifter = () => {
    const {t} = useTranslation("skjema");

    const {boutgifter, setBoutgifter} = useBoutgifter();
    const {bosituasjon} = useBosituasjon();
    const {bostotte} = useInntekterBostotte();

    if (!boutgifter) return null;

    // Determine if the GuidePanel should be shown
    const shouldShowGuidePanel = () => {
        const filteredBoutgifter = Object.fromEntries(
            Object.entries(boutgifter || {}).filter(([key]) => key === "husleie")
        );
        const leieBosituasjon = bosituasjon?.botype === "leier" || bosituasjon?.botype === "kommunal";

        const bostotteIkkeBesvart = !bostotte?.hasBostotte && !bostotte?.hasSamtykke;
        const bostotteBesvartJaDeretterNei = bostotte?.hasBostotte && !bostotte?.hasSamtykke;

        const harUtgiftHusleie = Object.values(filteredBoutgifter).some((value) => value === true);

        if (leieBosituasjon && bostotteIkkeBesvart && harUtgiftHusleie) {
            return true;
        }
        if (bostotteBesvartJaDeretterNei && harUtgiftHusleie) {
            return true;
        }
        if (bostotteIkkeBesvart && harUtgiftHusleie) {
            return true;
        }
        return false;
    };

    // Event handler to update boutgifter when checkboxes change
    const handleCheckboxChange = (
        selectedOptions: (keyof Omit<BoutgifterFrontend, "bekreftelse" | "skalViseInfoVedBekreftelse">)[]
    ) => {
        setBoutgifter(selectedOptions);
    };

    return (
        <div className="skjema-sporsmal">
            <CheckboxGroup
                legend={t("utgifter.boutgift.true.type.sporsmal")}
                onChange={handleCheckboxChange}
                value={Object.keys(boutgifter).filter((key) => boutgifter[key as keyof BoutgifterFrontend])}
            >
                <Checkbox value={"husleie"}>{t("utgifter.boutgift.true.type.husleie")}</Checkbox>
                <Checkbox value={"strom"}>{t("utgifter.boutgift.true.type.strom")}</Checkbox>
                <Checkbox value={"kommunalAvgift"}>{t("utgifter.boutgift.true.type.kommunalAvgift")}</Checkbox>
                <Checkbox value={"oppvarming"}>{t("utgifter.boutgift.true.type.oppvarming")}</Checkbox>
                <Checkbox value={"boliglan"}>{t("utgifter.boutgift.true.type.boliglan")}</Checkbox>
                <Checkbox value={"annet"}>{t("utgifter.boutgift.true.type.andreutgifter.stringValue")}</Checkbox>
            </CheckboxGroup>
            {shouldShowGuidePanel() && (
                <GuidePanel poster>
                    <Trans
                        t={t}
                        i18nKey={"informasjon.husbanken.bostotte.v2"}
                        components={{
                            lenke: (
                                <Link
                                    href={t("informasjon.husbanken.bostotte.url")}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {null}
                                </Link>
                            ),
                        }}
                    />
                </GuidePanel>
            )}
        </div>
    );
};
