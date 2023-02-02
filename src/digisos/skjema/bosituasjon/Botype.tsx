import * as React from "react";
import {BotypeListe, BotypePrimaerValg, BotypeSekundaerValg} from "./bosituasjonTypes";
import {useBosituasjon} from "./useBosituasjon";
import {RadioPanelGruppe, RadioPanelProps, SkjemaGruppe} from "nav-frontend-skjema";
import {FormattedMessage} from "react-intl";
import {NyttUnderskjema} from "./NyttUnderskjema";
import {useTranslation} from "react-i18next";

interface BotypeProps {
    behandlingsId: string;
}

const Botype = ({behandlingsId}: BotypeProps) => {
    const {t} = useTranslation("skjema");
    const {bosituasjon, setBosituasjon} = useBosituasjon(behandlingsId);

    // Hjelpefunksjon: Vis kun undermenyen dersom ikke "eier", "leier", "kommunal" eller "ingen" er valgt
    const showBosituasjonSubmenu = () =>
        !["eier", "leier", "kommunal", "ingen", null].includes(bosituasjon?.botype || null);

    // Hjelpefunksjon: Generer RadioPanelProps fra BotypeListe
    const radiosFromBotyper = (botypeListe: BotypeListe): RadioPanelProps[] =>
        Object.entries(botypeListe).map(([name, descriptor]) => ({
            label: t(descriptor.messageDescriptor.id!),
            id: name,
            value: name,
            checked: bosituasjon?.botype === name,
        }));

    return (
        <SkjemaGruppe legend={<FormattedMessage id={"bosituasjon.sporsmal"} defaultMessage={"Hvordan bor du?"} />}>
            <RadioPanelGruppe
                radios={radiosFromBotyper(BotypePrimaerValg)}
                name={"bosituasjon"}
                onChange={async (_e, botype) => setBosituasjon({botype})}
            />

            <NyttUnderskjema hidden={!showBosituasjonSubmenu()}>
                <RadioPanelGruppe
                    legend={
                        <FormattedMessage id={"bosituasjon.annet.botype.sporsmal"} defaultMessage={"Vil du utdype?"} />
                    }
                    radios={radiosFromBotyper(BotypeSekundaerValg)}
                    name={"bosituasjon.annet.botype"}
                    onChange={async (_e, botype) => setBosituasjon({botype})}
                />
            </NyttUnderskjema>
        </SkjemaGruppe>
    );
};

export default Botype;
