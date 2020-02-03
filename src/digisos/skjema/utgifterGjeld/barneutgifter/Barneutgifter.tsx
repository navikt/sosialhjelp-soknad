import * as React from "react";
import {FormattedHTMLMessage, useIntl} from "react-intl";
import {
    SoknadsSti,
    oppdaterSoknadsdataSti,
} from "../../../redux/soknadsdata/soknadsdataReducer";
import Sporsmal, {
    LegendTittleStyle,
} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {Barneutgifter, BarneutgifterKeys} from "./BarneutgifterTypes";
import CheckboxPanel from "../../../../nav-soknad/faktum/CheckboxPanel";
import {useSelector, useDispatch} from "react-redux";
import {State} from "../../../redux/reducers";
import {
    hentSoknadsdata,
    lagreSoknadsdata,
} from "../../../redux/soknadsdata/soknadsdataActions";

const BarneutgifterKey = "utgifter.barn";

export const BarneutgifterView = () => {
    const behandlingsId = useSelector(
        (state: State) => state.soknad.behandlingsId
    );
    const soknadsdata = useSelector((state: State) => state.soknadsdata);

    const dispatch = useDispatch();

    const intl = useIntl();

    React.useEffect(() => {
        if (behandlingsId) {
            dispatch(hentSoknadsdata(behandlingsId, SoknadsSti.BARNEUTGIFTER));
        }
    }, [behandlingsId, dispatch]);

    const handleClickJaNeiSpsm = (verdi: boolean) => {
        if (behandlingsId) {
            const barneutgifter: Barneutgifter =
                soknadsdata.utgifter.barneutgifter;
            barneutgifter.bekreftelse = verdi;
            if (!verdi) {
                barneutgifter.fritidsaktiviteter = false;
                barneutgifter.barnehage = false;
                barneutgifter.sfo = false;
                barneutgifter.tannregulering = false;
                barneutgifter.annet = false;
            }
            dispatch(
                oppdaterSoknadsdataSti(SoknadsSti.BARNEUTGIFTER, barneutgifter)
            );
            dispatch(
                lagreSoknadsdata(
                    behandlingsId,
                    SoknadsSti.BARNEUTGIFTER,
                    barneutgifter
                )
            );
        }
    };

    const handleClickRadio = (idToToggle: BarneutgifterKeys) => {
        if (behandlingsId) {
            const barneutgifter: Barneutgifter =
                soknadsdata.utgifter.barneutgifter;
            barneutgifter[idToToggle] = !barneutgifter[idToToggle];
            dispatch(
                oppdaterSoknadsdataSti(SoknadsSti.BARNEUTGIFTER, barneutgifter)
            );
            dispatch(
                lagreSoknadsdata(
                    behandlingsId,
                    SoknadsSti.BARNEUTGIFTER,
                    barneutgifter
                )
            );
        }
    };

    const renderCheckBox = (navn: BarneutgifterKeys, textKey: string) => {
        const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;

        const barneutgifterElement: boolean | null = barneutgifter[navn];
        const isChecked: boolean = barneutgifterElement
            ? barneutgifterElement
            : false;

        return (
            <CheckboxPanel
                id={"barneutgifter_" + navn + "_checkbox"}
                name={navn}
                checked={isChecked}
                label={
                    <FormattedHTMLMessage
                        id={BarneutgifterKey + ".true.utgifter." + textKey}
                    />
                }
                onClick={() => handleClickRadio(navn)}
            />
        );
    };

    const barneutgifter: Barneutgifter = soknadsdata.utgifter.barneutgifter;
    return (
        <JaNeiSporsmal
            tekster={getFaktumSporsmalTekst(intl, BarneutgifterKey)}
            visible={barneutgifter.harForsorgerplikt}
            faktumKey={BarneutgifterKey}
            verdi={barneutgifter.bekreftelse}
            onChange={(verdi: boolean) => handleClickJaNeiSpsm(verdi)}
            legendTittelStyle={LegendTittleStyle.FET_NORMAL}
        >
            <Sporsmal
                tekster={getFaktumSporsmalTekst(
                    intl,
                    BarneutgifterKey + ".true.utgifter"
                )}
            >
                {renderCheckBox(
                    BarneutgifterKeys.FRITIDSAKTIVITETER,
                    BarneutgifterKeys.FRITIDSAKTIVITETER
                )}
                {renderCheckBox(
                    BarneutgifterKeys.BARNEHAGE,
                    BarneutgifterKeys.BARNEHAGE
                )}
                {renderCheckBox(BarneutgifterKeys.SFO, BarneutgifterKeys.SFO)}
                {renderCheckBox(
                    BarneutgifterKeys.TANNREGULERING,
                    BarneutgifterKeys.TANNREGULERING
                )}
                {renderCheckBox(
                    BarneutgifterKeys.ANNET,
                    BarneutgifterKeys.ANNET
                )}
            </Sporsmal>
        </JaNeiSporsmal>
    );
};

export default BarneutgifterView;
