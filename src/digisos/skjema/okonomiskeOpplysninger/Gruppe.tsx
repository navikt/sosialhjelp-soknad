import * as React from "react";
import Skjemapanel from "../../../nav-soknad/components/skjemapanel";
import {Opplysning, OpplysningGruppe} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {getGruppeTittelKey} from "../../redux/okonomiskeOpplysninger/opplysningerUtils";
import OpplysningView from "./OpplysningView";
import {useTranslation} from "react-i18next";

const GruppeView = (props: {key: OpplysningGruppe; gruppeKey: OpplysningGruppe; gruppe: Opplysning[]}) => {
    const {t} = useTranslation();
    const {gruppeKey, gruppe} = props;
    const gruppeTittelKey = getGruppeTittelKey(gruppeKey);
    if (gruppe?.length === 0) return null;

    return (
        <Skjemapanel>
            <h3>{t(gruppeTittelKey + ".sporsmal")}</h3>

            {gruppe.map((okonomiskOpplysning: Opplysning, gruppeIndex: number) => (
                <OpplysningView key={gruppeIndex} opplysning={okonomiskOpplysning} gruppeIndex={gruppeIndex} />
            ))}
        </Skjemapanel>
    );
};

export default GruppeView;
