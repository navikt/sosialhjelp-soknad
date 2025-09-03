import {useTranslation} from "react-i18next";
import {SkjemaHeadings, SkjemaSteg} from "../../lib/components/SkjemaSteg/SkjemaSteg.tsx";
import {useBegrunnelse} from "../../lib/hooks/data/useBegrunnelse";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {SkjemaStegBlock} from "../../lib/components/SkjemaSteg/SkjemaStegBlock.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/SkjemaStegTitle.tsx";
import {SkjemaStegStepper} from "../../lib/components/SkjemaSteg/SkjemaStegStepper.tsx";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/SkjemaStegButtons.tsx";
import {useNavigate} from "react-router";
import {useContextFeatureToggles} from "../../lib/providers/useContextFeatureToggles.ts";
import BegrunnelseForm from "./BegrunnelseForm.tsx";
import KategorierForm from "./KategorierForm.tsx";
import type {HarKategorierInputAllOfKategorierItem} from "../../generated/new-ssr/model";
import {useCurrentSoknadIsKort} from "../../lib/components/SkjemaSteg/useCurrentSoknadIsKort.tsx";
import {useSoknadId} from "../../lib/hooks/common/useSoknadId.ts";

export const Begrunnelse = () => {
    const {begrunnelse, updateBegrunnelse, updateCategories, isLoading, isError, invalidate} = useBegrunnelse();
    const {t} = useTranslation("skjema");
    const featureFlagData = useContextFeatureToggles();
    const isKategorierEnabled = featureFlagData?.["sosialhjelp.soknad.kategorier"] ?? false;

    const navigate = useNavigate();
    const isKortSoknad = useCurrentSoknadIsKort();
    const soknadId = useSoknadId();

    const goto = async (page: number) => {
        invalidate();
        window.umami.track("Skjemasteg fullført", {
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
                ) : isKategorierEnabled ? (
                    <KategorierForm
                        kategorier={begrunnelse?.kategorier}
                        onSubmit={(formValues) => {
                            updateCategories({
                                kategorier: formValues.categories.filter(
                                    (it) => it !== "NØDHJELP"
                                ) as HarKategorierInputAllOfKategorierItem[],
                                annet: formValues.annet ?? "",
                            });
                        }}
                    />
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
