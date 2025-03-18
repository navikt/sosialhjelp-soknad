import React from "react";
import {KortSkjemaHeadings, SkjemaSteg} from "../../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {BodyShort, Box, Heading} from "@navikt/ds-react";
import {SkjemaStegBlock} from "../../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {useTranslation} from "react-i18next";
import {ArbeidsforholdListe} from "../../03-arbeidUtdanning/ArbeidsforholdListe.tsx";
import {EktefellePersonaliaBruker} from "../../04-familie/EktefellePersonaliaBruker.tsx";
import {Systeminfo} from "../../../lib/components/systeminfo/Systeminfo.tsx";
import {useSivilstatus} from "../../../lib/hooks/data/useSivilstatus.tsx";
import {useForsorgerplikt} from "../../../lib/hooks/data/useForsorgerplikt.tsx";
import {ForsorgerPlikt} from "../../04-familie/ForsorgerPlikt.tsx";
import {SkjemaStegStepper} from "../../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {logAmplitudeSkjemaStegFullfort} from "../../../lib/logAmplitudeSkjemaStegFullfort.ts";

const ArbeidOgFamilie = (): React.JSX.Element => {
    const {t} = useTranslation("skjema");

    const navigate = useNavigate();
    const gotoPage = async (page: number) => {
        await logAmplitudeSkjemaStegFullfort(3);
        navigate(`../${page}`);
    };

    const {ektefelle} = useSivilstatus();

    const {forsorgerplikt} = useForsorgerplikt();

    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={3} onStepChange={gotoPage} />
            <SkjemaStegBlock className={"lg:space-y-12"}>
                <SkjemaStegTitle
                    className={"lg:mb-12"}
                    title={t(KortSkjemaHeadings[3].tittel)}
                    icon={KortSkjemaHeadings[3].ikon}
                />
                <form className={"space-y-12"} onSubmit={(e) => e.preventDefault()}>
                    <Box className="space-y-2">
                        <Heading size="small">{t("arbeidsforhold.sporsmal")}</Heading>
                        <ArbeidsforholdListe />
                    </Box>
                    <Box className="space-y-2">
                        <Heading size="small">{t("system.familie.sivilstatus.sporsmal")}</Heading>
                        {ektefelle?.navn ? (
                            <Systeminfo>
                                <EktefellePersonaliaBruker ektefelle={ektefelle} />
                            </Systeminfo>
                        ) : (
                            <>
                                <BodyShort>{t("system.familie.sivilstatus.empty")}</BodyShort>
                                <BodyShort>{t("system.familie.sivilstatus.stringValue")}</BodyShort>
                            </>
                        )}
                    </Box>
                    <Box className="space-y-2">
                        {forsorgerplikt?.ansvar?.length ? (
                            <ForsorgerPlikt
                                skipForm
                                heading={<Heading size="small">{t("familierelasjon.faktum.sporsmal")}</Heading>}
                            />
                        ) : (
                            <>
                                <BodyShort>
                                    {t("system.familie.barn.empty")}
                                    <br />
                                    {t("system.familie.sivilstatus.stringValue")}
                                </BodyShort>
                            </>
                        )}
                    </Box>
                </form>
                <SkjemaStegButtons onPrevious={async () => navigate("../2")} onNext={async () => await gotoPage(4)} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};

export default ArbeidOgFamilie;
