import * as React from "react";
import {getIntlTextOrKey} from "../../utils/intlUtils";
import {Flatknapp, Hovedknapp, Knapp} from "nav-frontend-knapper";
import {useIntl} from "react-intl";

interface Props {
    gaViderePending?: boolean;
    sendSoknadServiceUnavailable?: boolean;
    gaVidereLabel?: string;
    gaVidere?: () => void;
    gaTilbake?: () => void;
    avbryt?: () => void;
}

const SkjemaKnapperad: React.FC<Props> = ({
    gaViderePending,
    sendSoknadServiceUnavailable,
    gaVidere,
    gaTilbake,
    avbryt,
    gaVidereLabel,
}) => {
    const intl = useIntl();
    const isDisabled = (): boolean => {
        if (sendSoknadServiceUnavailable) {
            return true;
        }
        if (gaViderePending) {
            return true;
        }
        return false;
    };
    const shouldShowSpinner = (): boolean => {
        if (sendSoknadServiceUnavailable) {
            return false;
        }
        if (gaViderePending) {
            return true;
        }
        return false;
    };

    return (
        <div className="skjema-knapperad ikke-juridisk-tekst">
            <Hovedknapp
                id="gaa_videre_button"
                htmlType="button"
                onClick={gaVidere}
                spinner={shouldShowSpinner()}
                disabled={isDisabled()}
                type="hoved"
            >
                {gaVidereLabel ? gaVidereLabel : getIntlTextOrKey(intl, "skjema.knapper.gaavidere")}
            </Hovedknapp>
            <Knapp
                id="gaa_tilbake_button"
                htmlType="button"
                onClick={gaTilbake}
                disabled={gaViderePending || !gaTilbake}
                type="hoved"
            >
                {getIntlTextOrKey(intl, "skjema.knapper.tilbake")}
            </Knapp>
            <Flatknapp onClick={gaViderePending ? undefined : avbryt} type="flat">
                {getIntlTextOrKey(intl, "skjema.knapper.avbryt")}
            </Flatknapp>
        </div>
    );
};

export default SkjemaKnapperad;
