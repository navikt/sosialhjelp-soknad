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
import {logWarning} from "../../lib/log/loggerUtils";
import {SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {useLocation} from "react-router-dom";

export const Oppsummering = () => {
    const {t} = useTranslation("skjema");
    const behandlingsId = useBehandlingsId();
    const {sendSoknad, isError} = useSendSoknad(behandlingsId);
    const {isLoading, data: oppsummering} = useGetOppsummering(behandlingsId);
    const location = useLocation();

    if (isLoading) return <ApplicationSpinner />;
    const isKortSoknad = location.pathname.includes("/kort");

    return (
        <SkjemaSteg page={isKortSoknad ? 4 : 9}>
            <SkjemaSteg.Content>
                <SkjemaSteg.Title />

                <div>
                    {oppsummering?.steg.map((steg) => <OppsummeringSteg steg={steg} key={steg.stegNr} />)}
                    <SoknadsmottakerInfoPanel />
                    {isError && (
                        <Alert role="alert" variant="error" style={{marginTop: "1rem"}}>
                            {t("soknad.innsendingFeilet")}
                        </Alert>
                    )}
                </div>
                <SkjemaSteg.Buttons
                    confirmTextKey={"skjema.knapper.send"}
                    onConfirm={() => {
                        logAmplitudeEvent("skjema fullført", getAttributesForSkjemaFullfortEvent(oppsummering)).catch(
                            (e) => logWarning(`Amplitude error: ${e}`)
                        );
                        return sendSoknad();
                    }}
                />
            </SkjemaSteg.Content>
        </SkjemaSteg>
    );
};
export default Oppsummering;
