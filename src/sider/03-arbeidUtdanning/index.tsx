import * as React from "react";
import {debounce, Heading, Radio, RadioGroup, ReadMore} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {ArbeidsforholdListe} from "./ArbeidsforholdListe";
import {YesNoInput} from "../../lib/components/form/YesNoInput";
import {UnmountClosed} from "react-collapse";
import {useArbeidOgUtdanning} from "../../lib/hooks/data/useArbeidOgUtdanning";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import LocalizedTextarea from "../../lib/components/LocalizedTextArea.tsx";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {useNavigate} from "react-router";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {logAmplitudeSkjemaStegFullfort} from "../../lib/logAmplitudeSkjemaStegFullfort.ts";
import {UtdanningDtoStudentgrad} from "../../generated/new/model";
import {TextPlaceholder} from "../../lib/components/animasjoner/TextPlaceholder.tsx";
import {PropsWithChildren} from "react";
import {useCurrentSoknadIsKort} from "../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";

const MAX_LENGTH = 500;

const Side3 = ({children}: PropsWithChildren) => {
    const {t} = useTranslation("skjema");
    const navigate = useNavigate();
    const isKortSoknad = useCurrentSoknadIsKort();
    const soknadId = useSoknadId();

    const goto = async (page: number) => {
        await logAmplitudeSkjemaStegFullfort(3);
        window.umami.track("Skjemasteg fullført", {
            steg: "3",
            isKortSoknad: isKortSoknad,
            soknadId: soknadId,
        });
        navigate(`../${page}`);
    };

    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={3} onStepChange={goto} />
            <SkjemaStegBlock>
                <SkjemaStegTitle title={t(SkjemaHeadings[3].tittel)} icon={SkjemaHeadings[3].ikon} />
                {children}
                <SkjemaStegButtons onPrevious={async () => navigate("../2")} onNext={async () => await goto(4)} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};

export const ArbeidOgUtdanning = () => {
    const {t} = useTranslation("skjema");
    const {isLoading, updateArbeid, updateUtdanning, arbeid, utdanning} = useArbeidOgUtdanning();
    const onKommentarChange = React.useMemo(
        () =>
            debounce(
                ({target: {value}}: React.ChangeEvent<HTMLTextAreaElement>) =>
                    updateArbeid({kommentarTilArbeidsforhold: value}),
                500
            ),
        [updateArbeid]
    );
    if (isLoading) {
        return (
            <Side3>
                <TextPlaceholder lines={3} className={"mb-4"} />
                <TextPlaceholder lines={3} className={"mb-4"} />
                <TextPlaceholder lines={3} />
            </Side3>
        );
    }
    return (
        <Side3>
            <div className={"space-y-6"}>
                <Heading size="medium" spacing>
                    {t("arbeidsforhold.sporsmal")}
                </Heading>
                <ArbeidsforholdListe arbeidsforhold={arbeid?.arbeidsforholdList ?? []} />
                <LocalizedTextarea
                    onChange={onKommentarChange}
                    defaultValue={arbeid?.kommentar}
                    id={"arbeid.kommentar"}
                    maxLength={MAX_LENGTH}
                    description={t("opplysninger.arbeidsituasjon.kommentarer.description")}
                    label={t("opplysninger.arbeidsituasjon.kommentarer.label")}
                    className={"mt-8!"}
                />
            </div>
            <div>
                <Heading size="medium" spacing>
                    {t("arbeid.dinsituasjon.studerer.undertittel")}
                </Heading>
                <YesNoInput
                    name={"utdanning.erStudent"}
                    value={utdanning?.erStudent ?? null}
                    onChange={(checked) =>
                        updateUtdanning({
                            erStudent: checked,
                            type: checked ? "Studentgrad" : "IkkeStudent",
                            studentgrad: utdanning?.studentgrad,
                        })
                    }
                    legend={t("dinsituasjon.studerer.sporsmal")}
                    description={
                        <ReadMore header={t("dinsituasjon.studerer.mer.info.tittel")}>
                            {t("dinsituasjon.studerer.mer.info.forklaring")}
                        </ReadMore>
                    }
                />
                <UnmountClosed isOpened={utdanning?.erStudent === true}>
                    <RadioGroup
                        value={utdanning?.studentgrad ?? null}
                        onChange={(value) => {
                            updateUtdanning({
                                type: "Studentgrad",
                                studentgrad: value,
                            });
                        }}
                        legend={t("dinsituasjon.studerer.grad.sporsmal")}
                        className={"mt-8!"}
                    >
                        <Radio value={UtdanningDtoStudentgrad.HELTID}>{t("dinsituasjon.studerer.grad.heltid")}</Radio>
                        <Radio value={UtdanningDtoStudentgrad.DELTID}>{t("dinsituasjon.studerer.grad.deltid")}</Radio>
                    </RadioGroup>
                </UnmountClosed>
            </div>
        </Side3>
    );
};

export default ArbeidOgUtdanning;
