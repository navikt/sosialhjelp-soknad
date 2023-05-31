import * as React from "react";
import {getIntlTextOrKey} from "../../../nav-soknad/utils";
import {basePath} from "../../../configuration";
import {useTranslation} from "react-i18next";
import {Opplysning, opplysningSpec} from "../../../lib/opplysninger";

interface OwnProps {
    opplysning: Opplysning;
}

type Props = OwnProps;

const VedleggSlettet: React.FC<Props> = (props: Props) => {
    const {textKey} = opplysningSpec[props.opplysning.type];
    const {t} = useTranslation("skjema");

    return (
        <div className="vedlegg_slettet_wrapper">
            <div className="vedlegg_slettet_boks">
                <div className="vedlegg_slettet_ikon">
                    <div className="vedlegg_slettet_border">
                        <img src={`${basePath}/statisk/bilder/ikon_reportProblemCircle.svg`} alt="" />
                    </div>
                </div>
                <div className="vedlegg_slettet_tekst">{t(`${textKey}.slettet`)}</div>
            </div>
        </div>
    );
};

export default VedleggSlettet;
