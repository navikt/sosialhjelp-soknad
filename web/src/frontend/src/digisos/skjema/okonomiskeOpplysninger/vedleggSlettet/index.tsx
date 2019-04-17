import * as React from 'react';
import {Opplysning} from "../../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerTypes";
import {getKeyForOpplysningType} from "../../../../nav-soknad/redux/okonomiskeOpplysninger/okonomiskeOpplysningerUtils";
import {getIntlTextOrKey} from "../../../../nav-soknad/utils";
import { InjectedIntlProps, injectIntl} from "react-intl";

interface OwnProps {
    opplysning: Opplysning
}

type Props = OwnProps & InjectedIntlProps;

const VedleggSlettet: React.FC<Props> = (props: Props) => {

    const textKey = getKeyForOpplysningType(props.opplysning.type);

    const intlTextOrKey = getIntlTextOrKey(props.intl, textKey);

    return (
        <div className="vedlegg_slettet_wrapper">
            <div className="vedlegg_slettet_boks">
                <div className="vedlegg_slettet_ikon">
                    <div className="vedlegg_slettet_border">
                        <img src="/soknadsosialhjelp/statisk/bilder/ikon_reportProblemCircle.svg" alt=""/>
                    </div>
                </div>
                <div className="vedlegg_slettet_tekst">
                    { intlTextOrKey }
                    Vi har slettet vedlegget for { props.opplysning.type } fordi du ikke lenger har svart at du har { props.opplysning.type }
                </div>
            </div>
        </div>
    );
};

export default injectIntl(VedleggSlettet);
