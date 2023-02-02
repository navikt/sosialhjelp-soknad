import * as React from "react";
import {FormattedMessage} from "react-intl";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {Boutgifter, BoutgifterKeys} from "./BoutgifterTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
import Informasjonspanel from "../../../../nav-soknad/components/Informasjonspanel";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../../redux/reducers";
import {hentSoknadsdata, lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {Link} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

const BOUTGIFTER = "utgifter.boutgift";

export const BoutgifterView = () => {
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const soknadsdata = useSelector((state: State) => state.soknadsdata);

    const dispatch = useDispatch();
    const {t} = useTranslation("skjema");

    React.useEffect(() => {
        if (behandlingsId) {
            hentSoknadsdata(behandlingsId, SoknadsSti.BOUTGIFTER, dispatch);
        }
    }, [behandlingsId, dispatch]);

    const handleClickJaNeiSpsm = (verdi: boolean) => {
        if (behandlingsId) {
            const boutgifter: Boutgifter = soknadsdata.utgifter.boutgifter;
            boutgifter.bekreftelse = verdi;
            if (!verdi) {
                boutgifter.husleie = false;
                boutgifter.strom = false;
                boutgifter.kommunalAvgift = false;
                boutgifter.oppvarming = false;
                boutgifter.boliglan = false;
                boutgifter.annet = false;
            }
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.BOUTGIFTER, boutgifter));
            lagreSoknadsdata(behandlingsId, SoknadsSti.BOUTGIFTER, boutgifter, dispatch);
        }
    };

    const handleClickRadio = (idToToggle: BoutgifterKeys) => {
        if (behandlingsId) {
            const boutgifter: Boutgifter = soknadsdata.utgifter.boutgifter;
            boutgifter[idToToggle] = !boutgifter[idToToggle];
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.BOUTGIFTER, boutgifter));
            lagreSoknadsdata(behandlingsId, SoknadsSti.BOUTGIFTER, boutgifter, dispatch);
        }
    };

    const renderCheckBox = (navn: BoutgifterKeys, textKey: string) => {
        const boutgifter: Boutgifter = soknadsdata.utgifter.boutgifter;

        const boutgifterElement: boolean | null = boutgifter[navn];
        const isChecked: boolean = boutgifterElement ? boutgifterElement : false;

        return (
            <CheckboxPanel
                id={"boutgifter_" + navn + "_checkbox"}
                name={navn}
                checked={isChecked}
                label={<FormattedMessage id={BOUTGIFTER + ".true.type." + textKey} />}
                onClick={() => handleClickRadio(navn)}
            />
        );
    };

    const boutgifter: Boutgifter = soknadsdata.utgifter.boutgifter;
    return (
        <div className="skjema-sporsmal">
            <JaNeiSporsmal
                tekster={getFaktumSporsmalTekst(t, BOUTGIFTER)}
                faktumKey={BOUTGIFTER}
                verdi={boutgifter.bekreftelse}
                onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi)}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
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
            </JaNeiSporsmal>
            {boutgifter && boutgifter.skalViseInfoVedBekreftelse && boutgifter.bekreftelse === true && (
                <Informasjonspanel ikon={"ella"} farge="viktig">
                    <FormattedMessage
                        id="informasjon.husbanken.bostotte.v2"
                        values={{
                            a: (msg) => (
                                <Link
                                    href={t("informasjon.husbanken.bostotte.url")}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {msg}
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
