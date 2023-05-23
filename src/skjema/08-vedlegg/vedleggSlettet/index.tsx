import * as React from "react";
import {Opplysning} from "../../../digisos/redux/okonomiskeOpplysninger/opplysningerTypes";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import {basePath} from "../../../configuration";
import {useTranslation} from "react-i18next";
import {opplysningSpec} from "../../../digisos/redux/okonomiskeOpplysninger/opplysningerConfig";

interface OwnProps {
    opplysning: Opplysning;
}

type Props = OwnProps;

const VedleggSlettet: React.FC<Props> = (props: Props) => {
    const opplysningSpc = opplysningSpec[props.opplysning.type];
    const textKeyBase = opplysningSpc.textKey;
    const textKey = textKeyBase + ".slettet";
    const {t} = useTranslation("skjema");
    const intlTextOrKey = getIntlTextOrKey(t, textKey);

    return (
        <div className="vedlegg_slettet_wrapper">
            <div className="vedlegg_slettet_boks">
                <div className="vedlegg_slettet_ikon">
                    <div className="vedlegg_slettet_border">
                        <img src={`${basePath}/statisk/bilder/ikon_reportProblemCircle.svg`} alt="" />
                    </div>
                </div>
                <div className="vedlegg_slettet_tekst">{intlTextOrKey}</div>
            </div>
        </div>
    );
};

export default VedleggSlettet;
