import React from "react";
import {SkjemaSteg} from "../../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {Alert, BodyShort, Box, Heading, VStack} from "@navikt/ds-react";
import {SkjemaContent} from "../../../lib/components/SkjemaSteg/ny/SkjemaContent";
import {SkjemaStegTitle} from "../../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {useTranslation} from "react-i18next";
import {ArbeidsforholdListe} from "../../03-arbeidUtdanning/ArbeidsforholdListe.tsx";
import {EktefellePersonaliaBruker} from "../../04-familie/EktefellePersonaliaBruker.tsx";
import {RegistrerteBarn} from "../../04-familie/RegistrerteBarn.tsx";
import {Systeminfo} from "../../../lib/components/systeminfo/Systeminfo.tsx";
import {SkjemaStegButtons} from "../../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";

const ArbeidOgFamilie = (): React.JSX.Element => {
    const {t} = useTranslation("skjema");

    return (
        <SkjemaSteg page={2}>
            <VStack gap="4">
                <Alert variant="info">
                    <BodyShort>{t("arbeidOgFamilie.alert")}</BodyShort>
                </Alert>
                <SkjemaContent className={"lg:space-y-12"}>
                    <SkjemaStegTitle className={"lg:mb-12"} />
                    <form className={"space-y-12"} onSubmit={(e) => e.preventDefault()}>
                        <Box className="space-y-2">
                            <Heading size="small">{t("arbeidsforhold.sporsmal")}</Heading>
                            <ArbeidsforholdListe />
                        </Box>
                        <Box className="space-y-2">
                            <Heading size="small">{t("system.familie.sivilstatus.sporsmal")}</Heading>
                            <Systeminfo>
                                <EktefellePersonaliaBruker />
                            </Systeminfo>
                        </Box>
                        <Box className="space-y-2">
                            <Heading size="small">Barn du har forsørgeransvar for</Heading>
                            <RegistrerteBarn skipForm />
                        </Box>
                    </form>
                    <SkjemaStegButtons includeNextArrow />
                </SkjemaContent>
            </VStack>
        </SkjemaSteg>
    );
};

export default ArbeidOgFamilie;
