import {Alert} from "@navikt/ds-react";
import {SoknadsmottakerInfoPanel} from "./SoknadsmottakerInfoPanel";
import {ApplicationSpinner} from "../../lib/components/animasjoner/ApplicationSpinner";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useTranslation} from "react-i18next";
import {useGetOppsummering} from "../../generated/oppsummering-ressurs/oppsummering-ressurs";
import {OppsummeringSteg} from "./OppsummeringSteg";
import {getAttributesForSkjemaFullfortEvent} from "./getAttributesForSkjemaFullfortEvent";
import {logAmplitudeEvent} from "../../lib/amplitude/Amplitude";
import {SkjemaSteg} from "../../lib/components/SkjemaSteg/ny/SkjemaSteg";
import {useLocation} from "react-router-dom";
import {SkjemaStegButtons} from "../../lib/components/SkjemaSteg/ny/SkjemaStegButtons.tsx";
import {SkjemaContent} from "../../lib/components/SkjemaSteg/ny/SkjemaContent.tsx";
import {SkjemaStegTitle} from "../../lib/components/SkjemaSteg/ny/SkjemaStegTitle.tsx";
import {useSendSoknad1} from "../../generated/soknad-lifecycle-controller/soknad-lifecycle-controller.ts";
import digisosConfig from "../../lib/config.ts";
//import {sendSoknad} from "../../generated/soknad-actions/soknad-actions.ts";
//import {useSendSoknad} from "./useSendSoknad.tsx";

export const Oppsummering = () => {
    const {t} = useTranslation("skjema");
    const behandlingsId = useBehandlingsId();
    const {mutateAsync, isError} = useSendSoknad1();
    //const {sendSoknad, isError: hei} = useSendSoknad(behandlingsId);

    const {isLoading, data: oppsummering} = useGetOppsummering(behandlingsId);
    const location = useLocation();

    if (isLoading) return <ApplicationSpinner />;
    const isKortSoknad = location.pathname.includes("/kort");

    /**

                      <SkjemaStegButtons
                          confirmTextKey={"skjema.knapper.send"}
                          onConfirm={async () => {
                              const {digisosId} = await mutateAsync({soknadId: behandlingsId});
                              await logAmplitudeEvent("skjema fullført", {
                                  ...getAttributesForSkjemaFullfortEvent(oppsummering),
                              });
                              window.location.assign(`${digisosConfig.innsynURL}${digisosId}/status`);
                          }}
                      />



                      <SkjemaStegButtons
                          confirmTextKey={"skjema.knapper.send"}
                          onConfirm={async () => {
                              await logAmplitudeEvent("skjema fullført", getAttributesForSkjemaFullfortEvent(oppsummering));
                              return sendSoknad();
                          }}
                      />
                      </SkjemaContent>





     * */

    return (
        <SkjemaSteg page={isKortSoknad ? 4 : 9}>
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
                        console.log("send1");
                        const {digisosId} = await mutateAsync({soknadId: behandlingsId});
                        console.log("send2");
                        await logAmplitudeEvent("skjema fullført", {
                            ...getAttributesForSkjemaFullfortEvent(oppsummering),
                        });
                        console.log("send3");
                        window.location.assign(`${digisosConfig.innsynURL}${digisosId}/status`);
                    }}
                />
            </SkjemaContent>
        </SkjemaSteg>
    );
};
export default Oppsummering;
