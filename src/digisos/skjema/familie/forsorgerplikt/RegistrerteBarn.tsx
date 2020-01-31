import * as React from "react";
import {Barn} from "./ForsorgerPliktTypes";
import Detaljeliste, {
    DetaljelisteElement,
} from "../../../../nav-soknad/components/detaljeliste";
import {FormattedMessage, useIntl} from "react-intl";
import JaNeiSporsmal from "../../../../nav-soknad/faktum/JaNeiSporsmal";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import {LegendTittleStyle} from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {
    SoknadsSti,
    oppdaterSoknadsdataSti,
} from "../../../redux/soknadsdata/soknadsdataReducer";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";
import Dato from "../../../../nav-soknad/components/tidspunkt/Dato";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../redux/reducers";
import {lagreSoknadsdata} from "../../../redux/soknadsdata/soknadsdataActions";

const RegistrerteBarn = () => {
    const soknadsdata = useSelector((state: State) => state.soknadsdata);
    const behandlingsId = useSelector(
        (state: State) => state.soknad.behandlingsId
    );

    const dispatch = useDispatch();

    const intl = useIntl();

    const handleClickJaNeiSpsm = (verdi: boolean, barnIndex: number) => {
        if (behandlingsId) {
            const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
            const barnet = forsorgerplikt.ansvar[barnIndex];
            barnet.harDeltBosted = verdi;
            dispatch(
                oppdaterSoknadsdataSti(
                    SoknadsSti.FORSORGERPLIKT,
                    forsorgerplikt
                )
            );
            dispatch(
                lagreSoknadsdata(
                    behandlingsId,
                    SoknadsSti.FORSORGERPLIKT,
                    forsorgerplikt
                )
            );
        }
    };

    const onChangeSamvaersgrad = (verdi: string, barnIndex: number) => {
        const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
        const barnet = forsorgerplikt.ansvar[barnIndex];
        barnet.samvarsgrad = parseInt(verdi, 10);
        dispatch(
            oppdaterSoknadsdataSti(SoknadsSti.FORSORGERPLIKT, forsorgerplikt)
        );
    };

    const onBlur = () => {
        if (behandlingsId) {
            const forsorgerplikt = soknadsdata.familie.forsorgerplikt;
            dispatch(
                lagreSoknadsdata(
                    behandlingsId,
                    SoknadsSti.FORSORGERPLIKT,
                    forsorgerplikt
                )
            );
        }
    };

    const barn = soknadsdata.familie.forsorgerplikt.ansvar;

    return (
        <div>
            {barn.map((barnet: Barn, index: number) => (
                <div
                    key={index}
                    className={
                        index + 1 === barn.length
                            ? "barn barn_siste_liste_element"
                            : "barn"
                    }
                >
                    {!barnet.harDiskresjonskode && (
                        <Detaljeliste>
                            <DetaljelisteElement
                                tittel={
                                    <span>
                                        <FormattedMessage id="kontakt.system.personalia.navn" />
                                    </span>
                                }
                                verdi={barnet.barn.navn.fulltNavn}
                            />
                            <DetaljelisteElement
                                tittel={
                                    <span>
                                        <FormattedMessage id="familierelasjon.fodselsdato" />
                                    </span>
                                }
                                verdi={
                                    <Dato tidspunkt={barnet.barn.fodselsdato} />
                                }
                            />
                            <DetaljelisteElement
                                tittel={
                                    <span>
                                        <FormattedMessage id="familierelasjon.samme_folkeregistrerte_adresse" />
                                    </span>
                                }
                                verdi={
                                    barnet.erFolkeregistrertSammen
                                        ? "Ja"
                                        : "Nei"
                                }
                            />
                            {barnet.erFolkeregistrertSammen && (
                                <div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
                                    <JaNeiSporsmal
                                        id={"barn_radio_" + index}
                                        tekster={getFaktumSporsmalTekst(
                                            intl,
                                            "system.familie.barn.true.barn.deltbosted"
                                        )}
                                        faktumKey={
                                            "system.familie.barn.true.barn.deltbosted"
                                        }
                                        verdi={barnet.harDeltBosted}
                                        onChange={(verdi: boolean) =>
                                            handleClickJaNeiSpsm(verdi, index)
                                        }
                                        legendTittelStyle={
                                            LegendTittleStyle.FET_NORMAL
                                        }
                                    />
                                </div>
                            )}
                            {!barnet.erFolkeregistrertSammen && (
                                <div className="skjema-sporsmal skjema-sporsmal__innhold barn_samvaer_block">
                                    <InputEnhanced
                                        getName={() =>
                                            "barn" + index + "_samvaersgrad"
                                        }
                                        id={"barn" + index + "_samvaersgrad"}
                                        maxLength={3}
                                        verdi={
                                            barnet.samvarsgrad !== null
                                                ? barnet.samvarsgrad.toString()
                                                : ""
                                        }
                                        onChange={(verdi: string) =>
                                            onChangeSamvaersgrad(verdi, index)
                                        }
                                        onBlur={() => onBlur()}
                                        faktumKey="system.familie.barn.true.barn.grad"
                                        required={false}
                                    />
                                </div>
                            )}
                        </Detaljeliste>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RegistrerteBarn;
