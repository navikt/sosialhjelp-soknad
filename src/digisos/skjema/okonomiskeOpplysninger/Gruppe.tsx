import * as React from "react";
import Skjemapanel from "../../../nav-soknad/components/skjemapanel";
import {FormattedMessage} from "react-intl";
import {Opplysning, OpplysningGruppe} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {getGruppeTittelKey} from "../../redux/okonomiskeOpplysninger/opplysningerUtils";
import OpplysningView from "./OpplysningView";

const GruppeView = (props: {key: OpplysningGruppe; gruppeKey: OpplysningGruppe; gruppe: Opplysning[]}) => {
    const renderGruppeInnhold = (gruppe: Opplysning[]) => {
        const gruppeInnhold = gruppe.map((okonomiskOpplysning: Opplysning, gruppeIndex: number) => {
            return <OpplysningView key={gruppeIndex} opplysning={okonomiskOpplysning} gruppeIndex={gruppeIndex} />;
        });
        return gruppeInnhold;
    };

    const {gruppeKey, gruppe} = props;
    const gruppeTittelKey = getGruppeTittelKey(gruppeKey);
    if (gruppe && gruppe.length === 0) {
        return null;
    }

    return (
        <Skjemapanel>
            <h3>
                <FormattedMessage id={gruppeTittelKey + ".sporsmal"} />
            </h3>

            {renderGruppeInnhold(gruppe)}
        </Skjemapanel>
    );
};

export default GruppeView;
