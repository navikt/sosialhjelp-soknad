import * as React from "react";
import {SetStateAction} from "react";
import RadioEnhanced from "../../../nav-soknad/faktum/RadioEnhanced";
import Sporsmal, {LegendTittleStyle} from "../../../nav-soknad/components/sporsmal/Sporsmal";
import Underskjema from "../../../nav-soknad/components/underskjema";
import {Bosituasjonsvalg, BosituasjonAnnetvalg} from "./bosituasjonTypes";

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
        checked={value == id}
        onChange={(event: any) => setValue(event.target.value)}
        name={name}
    />
);

type Botype = string | null;

interface BotypeProps {
    botype: Botype;
    setBotype: React.Dispatch<SetStateAction<Botype>>;
}

export const Botype = ({botype, setBotype}: BotypeProps) => {
    // Hjelpefunksjon: Vis kun undermenyen dersom ikke "eier", "leier", "kommunal" eller "ingen" er valgt
    const showBosituasjonSubmenu = () =>
        ![Bosituasjonsvalg.eier, Bosituasjonsvalg.leier, Bosituasjonsvalg.kommunal, Bosituasjonsvalg.ingen].includes(
            botype as Bosituasjonsvalg
        );

    return (
        <Sporsmal sprakNokkel={"bosituasjon"} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
            {Object.keys(Bosituasjonsvalg).map((id) => (
                <BosituasjonRadioknapp id={id} key={id} name={"bosituasjon"} value={botype} setValue={setBotype} />
            ))}

            <div className="skjema-sporsmal--jaNeiSporsmal">
                <Underskjema visible={showBosituasjonSubmenu()} arrow={true}>
                    <Sporsmal sprakNokkel={"bosituasjon"} legendTittelStyle={LegendTittleStyle.FET_NORMAL}>
                        {Object.keys(BosituasjonAnnetvalg).map((id) => (
                            <BosituasjonRadioknapp
                                id={id}
                                key={id}
                                name={"bosituasjon.annet.botype"}
                                value={botype}
                                setValue={setBotype}
                            />
                        ))}
                    </Sporsmal>
                </Underskjema>
            </div>
        </Sporsmal>
    );
};

export default Botype;
