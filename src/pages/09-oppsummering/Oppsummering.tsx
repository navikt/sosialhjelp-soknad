import {Alert} from "@navikt/ds-react";
import {SoknadsmottakerInfoPanel} from "./SoknadsmottakerInfoPanel";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {SkjemaStegLegacy} from "../../lib/components/SkjemaSteg/SkjemaStegLegacy";
import {digisosSkjemaConfig} from "../../lib/components/SkjemaSteg/digisosSkjema";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useTranslation} from "react-i18next";
import {useGetOppsummering} from "../../generated/oppsummering-ressurs/oppsummering-ressurs";
import {OppsummeringSteg} from "./OppsummeringSteg";
import {SjekkelisteIllustrasjon} from "../../lib/components/svg/illustrasjoner/SjekkelisteIllustrasjon";
//import {useAmplitude} from "../../lib/amplitude/useAmplitude";
import {getAttributesForSkjemaFullfortEvent} from "./getAttributesForSkjemaFullfortEvent";
import {useSendSoknad} from "./useSendSoknad";
import {logAmplitudeEvent} from "../../lib/amplitude/Amplitude";
import {logWarning} from "../../lib/log/loggerUtils";

export const Oppsummering = () => {
    //const {logEvent} = useAmplitude();
    const {t} = useTranslation("skjema");
    const behandlingsId = useBehandlingsId();
    const {sendSoknad, isError} = useSendSoknad(behandlingsId);
    const {isLoading, data: oppsummering} = useGetOppsummering(behandlingsId);

    if (isLoading) return <ApplicationSpinner />;

    return (
        <SkjemaStegLegacy
            skjemaConfig={digisosSkjemaConfig}
            steg={"oppsummering"}
            onSend={async () => {
                logAmplitudeEvent("skjema fullført", getAttributesForSkjemaFullfortEvent(oppsummering)).catch((e) =>
                    logWarning(`Amplitude error: ${e}`)
                );
                await sendSoknad();
            }}
            ikon={<SjekkelisteIllustrasjon />}
        >
            <div>
                {oppsummering?.steg.map((steg) => <OppsummeringSteg steg={steg} key={steg.stegNr} />)}
                <SoknadsmottakerInfoPanel />
                {isError && (
                    <Alert role="alert" variant="error" style={{marginTop: "1rem"}}>
                        {t("soknad.innsendingFeilet")}
                    </Alert>
                )}
            </div>
        </SkjemaStegLegacy>
    );
};
export default Oppsummering;
