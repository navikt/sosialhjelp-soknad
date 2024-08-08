import * as React from "react";
import {Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {YesNoInput} from "../../lib/components/form/YesNoInput";
import {SkalIkkeFinansiereStudier} from "./SkalIkkeFinansiereStudier";
import {updateStudielan, useHentStudielanBekreftelse} from "../../generated/client/studielan-ressurs/studielan-ressurs";
import {useDigisosMutation} from "../../lib/hooks/common/useDigisosMutation";
import {useBehandlingsId} from "../../lib/hooks/common/useBehandlingsId";
import {useAlgebraic} from "../../lib/hooks/common/useAlgebraic";

export const Studielan = () => {
    const {t} = useTranslation("skjema");

    const behandlingsId = useBehandlingsId();
    const {mutate} = useDigisosMutation(useHentStudielanBekreftelse, updateStudielan);
    const {expectOK, data: studielan} = useAlgebraic(useHentStudielanBekreftelse(behandlingsId));

    if (!studielan?.skalVises) return null;

    return expectOK((studielan) => (
        <div className="space-y-4">
            <Heading size="medium" level="2">
                {t("inntekt.studielan.tittel")}
            </Heading>
            <YesNoInput
                name={"studielan-bekreftelse"}
                legend={t("inntekt.studielan.sporsmal")}
                onChange={(checked) => mutate({bekreftelse: checked})}
                defaultValue={studielan?.bekreftelse}
            />
            {studielan?.bekreftelse === true && <SkalIkkeFinansiereStudier />}
        </div>
    ));
};
