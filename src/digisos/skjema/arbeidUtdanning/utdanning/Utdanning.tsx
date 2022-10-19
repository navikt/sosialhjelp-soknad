import * as React from "react";
import {useDispatch} from "react-redux";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import {FormattedMessage, useIntl} from "react-intl";
import Sporsmal, {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import RadioEnhanced from "../../../../nav-soknad/faktum/RadioEnhanced";
import {SoknadsSti, oppdaterSoknadsdataSti} from "../../../redux/soknadsdata/soknadsdataReducer";
import {hentSoknadsdata, lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";
import {Heading} from "@navikt/ds-react";
import {useSoknad} from "../../../redux/soknad/useSoknad";
import {useSoknadsdata} from "../../../redux/soknadsdata/useSoknadsdata";
import {useEffect} from "react";

const FAKTUM_STUDIER = "dinsituasjon.studerer";
const FAKTUM_STUDERER = "dinsituasjon.studerer.true.grad";

const UtdanningView = () => {
    const {behandlingsId} = useSoknad();
    const {utdanning} = useSoknadsdata();

    const dispatch = useDispatch();

    const intl = useIntl();

    useEffect(() => {
        behandlingsId && hentSoknadsdata(behandlingsId, SoknadsSti.UTDANNING, dispatch);
    }, [behandlingsId, dispatch]);

    const setUtdanning = (endredeFelt: {erStudent?: boolean; studengradErHeltid?: boolean}) => {
        if (behandlingsId) {
            const oppdatertUtdanning = {...utdanning, ...endredeFelt};
            dispatch(oppdaterSoknadsdataSti(SoknadsSti.UTDANNING, oppdatertUtdanning));
            lagreSoknadsdata(behandlingsId, SoknadsSti.UTDANNING, oppdatertUtdanning, dispatch);
        }
    };

    const {erStudent, studengradErHeltid} = utdanning;

    return (
        <>
            {" "}
            <Heading style={{marginLeft: "2rem"}} level="2" size="medium" spacing>
                <FormattedMessage id="arbeid.dinsituasjon.studerer.undertittel" />
            </Heading>
            <JaNeiSporsmal
                tekster={getFaktumSporsmalTekst(intl, FAKTUM_STUDIER)}
                faktumKey={FAKTUM_STUDIER}
                verdi={erStudent}
                onChange={(erStudent) => setUtdanning({erStudent})}
                legendTittelStyle={LegendTittleStyle.FET_NORMAL}
            >
                <Sporsmal
                    tekster={getFaktumSporsmalTekst(intl, FAKTUM_STUDERER)}
                    legendTittelStyle={LegendTittleStyle.FET_NORMAL}
                >
                    <RadioEnhanced
                        name="studerer_radio"
                        id="studerer_radio_heltid"
                        faktumKey={FAKTUM_STUDERER}
                        value="heltid"
                        checked={studengradErHeltid !== null && studengradErHeltid}
                        onChange={() => setUtdanning({studengradErHeltid: true})}
                    />
                    <RadioEnhanced
                        name="studerer_radio"
                        id="studerer_radio_deltid"
                        faktumKey={FAKTUM_STUDERER}
                        value="deltid"
                        checked={studengradErHeltid !== null && !studengradErHeltid}
                        onChange={() => setUtdanning({studengradErHeltid: false})}
                    />
                </Sporsmal>
            </JaNeiSporsmal>
        </>
    );
};

export default UtdanningView;
