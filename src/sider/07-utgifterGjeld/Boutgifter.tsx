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

    console.log("boutgifter.skalViseInfoVedBekreftelse", boutgifter.skalViseInfoVedBekreftelse);
    console.log("boutgifter.bekreftelse", boutgifter.bekreftelse);
    const bosituasjonen = bosituasjon?.botype === "leier" || bosituasjon?.botype === "kommunal";
    const bostottenBek = bostotte?.bekreftelse;
    const bostottenSam = bostotte?.samtykke;
    console.log("bosituasjonen", bosituasjonen);
    console.log("bostottenBek", bostottenBek);
    console.log("bostottenSam", bostottenSam);

    return (
        <div className="skjema-sporsmal">
            <CheckboxGroup
                legend={t("utgifter.boutgift.true.type.sporsmal")}
                onChange={(navn: (keyof Omit<BoutgifterFrontend, "bekreftelse" | "skalViseInfoVedBekreftelse">)[]) =>
                    setBoutgifter(navn)
                }
                value={Object.keys(boutgifter).filter((key) => boutgifter[key as keyof BoutgifterFrontend])}
            >
                <Checkbox value={"husleie"}>{t("utgifter.boutgift.true.type.husleie")}</Checkbox>
                <Checkbox value={"strom"}>{t("utgifter.boutgift.true.type.strom")}</Checkbox>
                <Checkbox value={"kommunalAvgift"}>{t("utgifter.boutgift.true.type.kommunalAvgift")}</Checkbox>
                <Checkbox value={"oppvarming"}>{t("utgifter.boutgift.true.type.oppvarming")}</Checkbox>
                <Checkbox value={"boliglan"}>{t("utgifter.boutgift.true.type.boliglan")}</Checkbox>
                <Checkbox value={"annet"}>{t("utgifter.boutgift.true.type.andreutgifter.stringValue")}</Checkbox>
            </CheckboxGroup>
            {!boutgifter?.skalViseInfoVedBekreftelse && ((bostottenBek && !bostottenSam) || bosituasjon) && (
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
