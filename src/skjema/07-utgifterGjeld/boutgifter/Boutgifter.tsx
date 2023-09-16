import * as React from "react";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../nav-soknad/utils";
import CheckboxPanel from "../../../nav-soknad/faktum/CheckboxPanel";
import Informasjonspanel from "../../../nav-soknad/components/Informasjonspanel";
import {Link} from "@navikt/ds-react";
import {Trans, useTranslation} from "react-i18next";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {Boutgifter, BoutgifterKeys} from "./BoutgifterTypes";

const BOUTGIFTER = "utgifter.boutgift";

export const BoutgifterView = () => {
    const {soknadsdata, lagre, oppdater} = useSoknadsdata(SoknadsSti.BOUTGIFTER);
    const boutgifter: Boutgifter = soknadsdata.utgifter.boutgifter;
    const {t} = useTranslation("skjema");

    const handleClickRadio = (idToToggle: BoutgifterKeys) => {
        boutgifter[idToToggle] = !boutgifter[idToToggle];
        oppdater(boutgifter);
        lagre(boutgifter);
    };

    const renderCheckBox = (navn: BoutgifterKeys, textKey: string) => {
        const isChecked = !!boutgifter[navn];

        return (
            <CheckboxPanel
                id={"boutgifter_" + navn + "_checkbox"}
                name={navn}
                checked={isChecked}
                label={t(BOUTGIFTER + ".true.type." + textKey)}
                onClick={() => handleClickRadio(navn)}
            />
        );
    };

    return (
        <div className="skjema-sporsmal">
            <Sporsmal
                tekster={getFaktumSporsmalTekst(t, BOUTGIFTER + ".true.type")}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                {renderCheckBox(BoutgifterKeys.HUSLEIE, BoutgifterKeys.HUSLEIE)}
                {renderCheckBox(BoutgifterKeys.STROM, BoutgifterKeys.STROM)}
                {renderCheckBox(BoutgifterKeys.KOMMUNALAVGIFT, BoutgifterKeys.KOMMUNALAVGIFT)}
                {renderCheckBox(BoutgifterKeys.OPPVARMING, BoutgifterKeys.OPPVARMING)}
                {renderCheckBox(BoutgifterKeys.BOLIGLAN, BoutgifterKeys.BOLIGLAN)}
                {renderCheckBox(BoutgifterKeys.ANNET, "andreutgifter")}
            </Sporsmal>
            {boutgifter && boutgifter.skalViseInfoVedBekreftelse && boutgifter.bekreftelse === true && (
                <Informasjonspanel ikon={"ella"} farge="viktig">
                    <Trans
                        t={t}
                        i18nKey={"informasjon.husbanken.bostotte.v2"}
                        components={{
                            lenke: (
                                <Link
                                    href={t("informasjon.husbanken.bostotte.url")}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {null}
                                </Link>
                            ),
                        }}
                    />
                </Informasjonspanel>
            )}
        </div>
    );
};

export default BoutgifterView;
