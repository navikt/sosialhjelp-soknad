import * as React from "react";
import Underskjema from "../../../nav-soknad/components/underskjema";
import {BotypeListe, BotypePrimaerValg, BotypeSekundaerValg} from "./bosituasjonTypes";
import {useBosituasjon} from "./useBosituasjon";
import {RadioPanelGruppe, RadioPanelProps, SkjemaGruppe} from "nav-frontend-skjema";
import {FormattedMessage, useIntl} from "react-intl";
import styled from "styled-components";

interface BotypeProps {
    behandlingsId: string;
}

const StyledSkjemaGruppe = styled(SkjemaGruppe)`
    padding: 0rem 2rem;
    margin-bottom: 5rem;
`;

const Botype = ({behandlingsId}: BotypeProps) => {
    const intl = useIntl();
    const {bosituasjon, setBosituasjon} = useBosituasjon(behandlingsId);

    // Hjelpefunksjon: Vis kun undermenyen dersom ikke "eier", "leier", "kommunal" eller "ingen" er valgt
    const showBosituasjonSubmenu = () => !["eier", "leier", "kommunal", "ingen", null].includes(bosituasjon.botype);

    // Hjelpefunksjon: Generer RadioPanelProps fra BotypeListe
    const radiosFromBotyper = (botypeListe: BotypeListe): RadioPanelProps[] =>
        Object.entries(botypeListe).map(([name, descriptor]) => ({
            label: intl.formatMessage(descriptor.messageDescriptor),
            id: name,
            value: name,
            checked: bosituasjon.botype === name,
        }));

    return (
        <StyledSkjemaGruppe>
            <RadioPanelGruppe
                legend={<FormattedMessage id={"bosituasjon.sporsmal"} defaultMessage={"Hvordan bor du?"} />}
                radios={radiosFromBotyper(BotypePrimaerValg)}
                name={"bosituasjon"}
                onChange={async (e, botype) => {
                    await setBosituasjon({botype});
                }}
            />

            <Underskjema visible={showBosituasjonSubmenu()} arrow jaNeiSporsmal>
                <RadioPanelGruppe
                    legend={<FormattedMessage id={"bosituasjon.sporsmal"} defaultMessage={"Hvordan bor du?"} />}
                    radios={radiosFromBotyper(BotypeSekundaerValg)}
                    name={"bosituasjon.annet.botype"}
                    onChange={async (e, botype) => {
                        await setBosituasjon({botype});
                    }}
                />
            </Underskjema>
        </StyledSkjemaGruppe>
    );
};

export default Botype;
