import * as React from "react";
import {Heading} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {YesNoInput} from "../../../nav-soknad/components/form/YesNoInput";
import {InformasjonTilStudent} from "./InformasjonTilStudent";
import {updateStudielan, useHentStudielanBekreftelse} from "../../../generated/studielan-ressurs/studielan-ressurs";
import {useDigisosMutation} from "../../01-personalia/useDigisosMutation";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {useAlgebraic} from "../../../lib/hooks/useAlgebraic";

const StudielanView = () => {
    const {t} = useTranslation("skjema");

    const behandlingsId = useBehandlingsId();
    const {mutate} = useDigisosMutation(useHentStudielanBekreftelse, updateStudielan);
    const {expectOK, data: studielan} = useAlgebraic(useHentStudielanBekreftelse(behandlingsId));

    if (!studielan?.skalVises) return null;

    return expectOK((studielan) => (
        <div className="space-y-4">
            <Heading size="medium" level="2">
                {t("inntekt.studielan.titel")}
            </Heading>
            <YesNoInput
                name={"studielan-bekreftelse"}
                legend={t("inntekt.studielan.sporsmal")}
                onChange={({target: {checked}}) => mutate({bekreftelse: checked})}
                defaultValue={studielan?.bekreftelse}
            />
            {studielan?.bekreftelse === true && <InformasjonTilStudent />}
        </div>
    ));
};

export default StudielanView;
