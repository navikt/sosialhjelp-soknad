import {FormattedMessage, useIntl} from "react-intl";
import * as React from "react";
import {useSelector} from "react-redux";

import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import Detaljeliste, {
    DetaljelisteElement,
} from "../../../../nav-soknad/components/detaljeliste";
import {DigisosFarge} from "../../../../nav-soknad/components/svg/DigisosFarger";
import Informasjonspanel, {
    InformasjonspanelIkon,
} from "../../../../nav-soknad/components/informasjonspanel";
import Dato from "../../../../nav-soknad/components/tidspunkt/Dato";

import {State} from "../../../redux/reducers";

const EktefelleDetaljer = () => {
    const {
        ektefelle,
        harDiskresjonskode,
        erFolkeregistrertSammen,
    } = useSelector((state: State) => state.soknadsdata.familie.sivilstatus);

    const intl = useIntl();

    const renderSivilstatusLabel = (
        ektefelleHarDiskresjonskode: boolean | undefined
    ) => {
        let formattedMessageId: string = "system.familie.sivilstatus.label";
        if (
            ektefelleHarDiskresjonskode &&
            ektefelleHarDiskresjonskode === true
        ) {
            formattedMessageId = "system.familie.sivilstatus.ikkeTilgang.label";
        }
        return <FormattedMessage id={formattedMessageId} />;
    };

    const renderEktefelleInformasjon = () => {
        const INTL_ID_EKTEFELLE = "system.familie.sivilstatus.gift.ektefelle";
        return (
            <div className="sivilstatus__ektefelleinfo">
                {ektefelle && ektefelle.navn && ektefelle.navn.fulltNavn && (
                    <Detaljeliste>
                        <DetaljelisteElement
                            tittel={
                                <FormattedMessage
                                    id={INTL_ID_EKTEFELLE + ".navn"}
                                />
                            }
                            verdi={ektefelle.navn.fulltNavn}
                        />
                        {ektefelle.fodselsdato && (
                            <DetaljelisteElement
                                tittel={
                                    <FormattedMessage
                                        id={INTL_ID_EKTEFELLE + ".fodselsdato"}
                                    />
                                }
                                verdi={
                                    <span className="dato">
                                        <Dato
                                            tidspunkt={ektefelle.fodselsdato}
                                        />
                                    </span>
                                }
                            />
                        )}
                        <DetaljelisteElement
                            tittel={
                                <FormattedMessage
                                    id={INTL_ID_EKTEFELLE + ".folkereg"}
                                />
                            }
                            verdi={
                                erFolkeregistrertSammen === true ? (
                                    <FormattedMessage
                                        id={
                                            INTL_ID_EKTEFELLE +
                                            ".folkeregistrertsammen.true"
                                        }
                                    />
                                ) : (
                                    <FormattedMessage
                                        id={
                                            INTL_ID_EKTEFELLE +
                                            ".folkeregistrertsammen.false"
                                        }
                                    />
                                )
                            }
                        />
                    </Detaljeliste>
                )}
            </div>
        );
    };

    return (
        <div className="sivilstatus skjema-sporsmal">
            <Sporsmal
                tekster={getFaktumSporsmalTekst(
                    intl,
                    "system.familie.sivilstatus"
                )}
                stil="system"
            >
                <div className="sivilstatus__infotekst">
                    <FormattedMessage id="system.familie.sivilstatus" />
                </div>
                <div className="sivilstatus__giftlabel">
                    {renderSivilstatusLabel(harDiskresjonskode)}
                    {renderEktefelleInformasjon()}
                </div>
            </Sporsmal>
            {harDiskresjonskode !== true && (
                <Informasjonspanel
                    farge={DigisosFarge.VIKTIG}
                    ikon={InformasjonspanelIkon.ELLA}
                >
                    <h4 className="skjema-sporsmal__infotekst__tittel">
                        <FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tittel" />
                    </h4>
                    <FormattedMessage id="system.familie.sivilstatus.informasjonspanel.tekst" />
                </Informasjonspanel>
            )}
        </div>
    );
};

export default EktefelleDetaljer;
