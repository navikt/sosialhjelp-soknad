import {useTranslation} from "react-i18next";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {useBegrunnelse} from "../../lib/hooks/data/useBegrunnelse";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {useNavigate} from "react-router";
import BegrunnelseForm from "./BegrunnelseForm.tsx";
import {useCurrentSoknadIsKort} from "../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";
import {umamiTrack} from "../../app/umami.ts";

export const Begrunnelse = () => {
    const {begrunnelse, updateBegrunnelse, isLoading, isError, invalidate} = useBegrunnelse();
    const {t} = useTranslation("skjema");

    const navigate = useNavigate();
    const isKortSoknad = useCurrentSoknadIsKort();
    const soknadId = useSoknadId();

    const goto = async (page: number) => {
        invalidate();
        umamiTrack("Skjemasteg fullført", {
            steg: "2",
            isKortSoknad: isKortSoknad,
            soknadId: soknadId,
        });
        navigate(`../${page}`);
    };

    return (
        <SkjemaSteg>
            <SkjemaStegStepper page={2} onStepChange={goto} />
            <SkjemaStegBlock>
                <SkjemaStegTitle title={t(SkjemaHeadings[2].tittel)} icon={SkjemaHeadings[2].ikon} />
                {isLoading ? (
                    <ApplicationSpinner />
                ) : (
                    <BegrunnelseForm
                        begrunnelse={begrunnelse}
                        onSubmit={(formValues) =>
                            updateBegrunnelse({
                                hvaSokesOm: formValues.hvaSokesOm ?? "",
                                hvorforSoke: formValues.hvorforSoke ?? "",
                            })
                        }
                        isError={isError}
                    />
                )}
                <SkjemaStegButtons onPrevious={() => navigate("../1")} onNext={() => goto(3)} />
            </SkjemaStegBlock>
        </SkjemaSteg>
    );
};

export default Begrunnelse;
