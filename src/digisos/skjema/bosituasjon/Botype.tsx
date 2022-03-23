import * as React from "react";
import {SetStateAction} from "react";
import RadioEnhanced from "../../../nav-soknad/faktum/RadioEnhanced";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import Underskjema from "../../../nav-soknad/components/underskjema";
import {Bosituasjonsvalg, BosituasjonAnnetvalg} from "./bosituasjonTypes";
import {useBosituasjon} from "./useBosituasjon";

interface BosituasjonRadioknappProps {
    id: string;
    name: string;
    value: any;
    setValue: SetStateAction<any>;
}

const BosituasjonRadioknapp = ({id, name, value, setValue}: BosituasjonRadioknappProps) => (
    <RadioEnhanced
        id={`${name}_radio_` + id}
        faktumKey={name}
        value={id}
        checked={value === id}
        onChange={(event: any) => setValue(event.target.value)}
        name={name}
    />
);

interface BotypeProps {
    behandlingsId: string;
}

export const Botype = ({behandlingsId}: BotypeProps) => {
    const {bosituasjon, setBosituasjon} = useBosituasjon(behandlingsId);

    if (!bosituasjon) return null;

    // Hjelpefunksjon: Vis kun undermenyen dersom ikke "eier", "leier", "kommunal" eller "ingen" er valgt
    const showBosituasjonSubmenu = () =>
        ![Bosituasjonsvalg.eier, Bosituasjonsvalg.leier, Bosituasjonsvalg.kommunal, Bosituasjonsvalg.ingen].includes(
            bosituasjon.botype as Bosituasjonsvalg
        );

    return (
        <Sporsmal sprakNokkel={"bosituasjon"} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
            {Object.keys(Bosituasjonsvalg).map((id) => (
                <BosituasjonRadioknapp
                    id={id}
                    key={id}
                    name={"bosituasjon"}
                    value={bosituasjon.botype}
                    setValue={async (botype: string) => await setBosituasjon({botype})}
                />
            ))}

            <div className="skjema-sporsmal--jaNeiSporsmal">
                <Underskjema visible={showBosituasjonSubmenu()} arrow={true}>
                    <Sporsmal sprakNokkel={"bosituasjon"} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
                        {Object.keys(BosituasjonAnnetvalg).map((id) => (
                            <BosituasjonRadioknapp
                                id={id}
                                key={id}
                                name={"bosituasjon.annet.botype"}
                                value={bosituasjon?.botype}
                                setValue={async (botype: string) => await setBosituasjon({botype})}
                            />
                        ))}
                    </Sporsmal>
                </Underskjema>
            </div>
        </Sporsmal>
    );
};

export default Botype;
