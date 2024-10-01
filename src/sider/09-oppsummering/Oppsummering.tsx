import {Alert} from "@navikt/ds-react";
import {SoknadsmottakerInfoPanel} from "./SoknadsmottakerInfoPanel";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useTranslation} from "react-i18next";
import {useGetOppsummering} from "../../generated/oppsummering-ressurs/oppsummering-ressurs";
import {OppsummeringSteg} from "./OppsummeringSteg";
import {getAttributesForSkjemaFullfortEvent} from "./getAttributesForSkjemaFullfortEvent";
import {useSendSoknad} from "./useSendSoknad";
import {logAmplitudeEvent} from "../../lib/amplitude/Amplitude";
import {SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {useLocation} from "react-router-dom";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {SkjemaContent} from "../../lib/components/SkjemaSteg/ny/SkjemaContent.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";

export const Oppsummering = () => {
    const {t} = useTranslation("skjema");
    const behandlingsId = useBehandlingsId();
    const {sendSoknad, isError} = useSendSoknad(behandlingsId);

    const {isLoading, data: oppsummering} = useGetOppsummering(behandlingsId);
    const location = useLocation();

    if (isLoading) return <ApplicationSpinner />;
    const isKortSoknad = location.pathname.includes("/kort");
    return (
        <SkjemaSteg page={isKortSoknad ? 5 : 9}>
            <SkjemaContent>
                <SkjemaStegTitle />

                <div>
                    {oppsummering?.steg.map((steg) => <OppsummeringSteg steg={steg} key={steg.stegNr} />)}
                    <SoknadsmottakerInfoPanel />
                    {isError && (
                        <Alert role="alert" variant="error" style={{marginTop: "1rem"}}>
                            {t("soknad.innsendingFeilet")}
                        </Alert>
                    )}
                </div>
                <SkjemaStegButtons
                    confirmTextKey={"skjema.knapper.send"}
                    onConfirm={async () => {
                        await logAmplitudeEvent("skjema fullført", getAttributesForSkjemaFullfortEvent(oppsummering));
                        return sendSoknad(isKortSoknad);
                    }}
                />
            </SkjemaContent>
        </SkjemaSteg>
    );
};
export default Oppsummering;
