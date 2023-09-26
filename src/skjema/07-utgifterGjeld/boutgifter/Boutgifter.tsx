import * as React from "react";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../nav-soknad/utils";
import CheckboxPanel from "../../../nav-soknad/faktum/CheckboxPanel";
import Informasjonspanel from "../../../nav-soknad/components/Informasjonspanel";
import {Link} from "@navikt/ds-react";
import {Trans, useTranslation} from "react-i18next";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {BoutgifterKeys} from "./BoutgifterTypes";

const BOUTGIFTER = "utgifter.boutgift";

export const BoutgifterView = () => {
    const {
        soknadsdata: {
            utgifter: {boutgifter},
        },
        lagre,
        oppdater,
    } = useSoknadsdata(SoknadsSti.BOUTGIFTER);
    const {t} = useTranslation("skjema");

    const setCheckboxValue = (idToToggle: BoutgifterKeys, value: boolean) => {
        boutgifter[idToToggle] = value;
        // FIXME: Vet ikke hvorfor dette er nødvendig,
        //  dette er en feil som går langt inn i backend.
        boutgifter.bekreftelse = harSvartJa();
        oppdater(boutgifter);
        lagre(boutgifter);
    };

    const renderCheckBox = (navn: BoutgifterKeys, textKey: string) => (
        <CheckboxPanel
            id={"boutgifter_" + navn + "_checkbox"}
            name={navn}
            checked={boutgifter[navn]}
            label={t(BOUTGIFTER + ".true.type." + textKey)}
            onClick={(value) => setCheckboxValue(navn, value)}
        />
    );

    const harSvartJa = () =>
        [
            BoutgifterKeys.HUSLEIE,
            BoutgifterKeys.STROM,
            BoutgifterKeys.KOMMUNALAVGIFT,
            BoutgifterKeys.OPPVARMING,
            BoutgifterKeys.BOLIGLAN,
            BoutgifterKeys.ANNET,
        ].some((key) => boutgifter[key]);

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
            {boutgifter?.skalViseInfoVedBekreftelse && boutgifter?.bekreftelse && (
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
