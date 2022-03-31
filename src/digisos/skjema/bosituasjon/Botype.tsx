import * as React from "react";
import Underskjema from "../../../nav-soknad/components/underskjema";
import {Bosituasjonsvalg, BosituasjonAnnetvalg} from "./bosituasjonTypes";
import {useBosituasjon} from "./useBosituasjon";
import {RadioPanelGruppe, SkjemaGruppe} from "nav-frontend-skjema";
import {FormattedMessage, useIntl} from "react-intl";
import styled from "styled-components";

interface BotypeProps {
    behandlingsId: string;
}

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
    padding: 0rem 2rem;
`;

const Botype = ({behandlingsId}: BotypeProps) => {
    const intl = useIntl();
    const {bosituasjon, setBosituasjon} = useBosituasjon(behandlingsId);

    // Hjelpefunksjon: Vis kun undermenyen dersom ikke "eier", "leier", "kommunal" eller "ingen" er valgt
    const showBosituasjonSubmenu = () =>
        ![Bosituasjonsvalg.eier, Bosituasjonsvalg.leier, Bosituasjonsvalg.kommunal, Bosituasjonsvalg.ingen].includes(
            bosituasjon.botype as Bosituasjonsvalg
        );

    return (
        <StyledSkjemaGruppe>
            <RadioPanelGruppe
                legend={<FormattedMessage id={"bosituasjon.sporsmal"} defaultMessage={"Hvordan bor du?"} />}
                radios={Object.keys(Bosituasjonsvalg).map((id) => ({
                    label: intl.formatMessage({id: `bosituasjon.${id}`}),
                    id: id,
                    value: id,
                    checked: bosituasjon.botype === id,
                }))}
                name={"bosituasjon"}
                onChange={async (e, value) => {
                    await setBosituasjon({botype: value as Bosituasjonsvalg});
                }}
            />

            <Underskjema visible={showBosituasjonSubmenu()} arrow jaNeiSporsmal>
                <RadioPanelGruppe
                    legend={<FormattedMessage id={"bosituasjon.sporsmal"} defaultMessage={"Hvordan bor du?"} />}
                    radios={Object.keys(BosituasjonAnnetvalg).map((id) => ({
                        label: intl.formatMessage({id: `bosituasjon.annet.botype.${id}`}),
                        id: id,
                        value: id,
                        checked: bosituasjon.botype === id,
                    }))}
                    name={"bosituasjon.annet.botype"}
                    onChange={async (e, value) => {
                        await setBosituasjon({botype: value as BosituasjonAnnetvalg});
                    }}
                />
            </Underskjema>
        </StyledSkjemaGruppe>
    );
};

export default Botype;
