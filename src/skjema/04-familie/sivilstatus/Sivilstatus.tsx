import * as React from "react";
import Underskjema from "../../../nav-soknad/components/underskjema";
import EktefellePersonaliaForm from "./EktefellePersonaliaForm";
import {useTranslation} from "react-i18next";
import {Button, Heading, Radio, RadioGroup} from "@navikt/ds-react";
import {useSivilstatus} from "./useSivilstatus";

import {EktefellerPlikterForsorge} from "./EktefellePlikterForsorge";
import {EktefellePersonaliaBruker} from "./EktefellePersonaliaBruker";
import {Systeminfo} from "../../../nav-soknad/components/systeminfo/Systeminfo";

export const Sivilstatus = () => {
    const {t} = useTranslation("skjema");
    const {sivilstatus, ektefelle, setSivilstatus, setEktefelle} = useSivilstatus();
    const [editMode, setEditMode] = React.useState(false);
    if (sivilstatus === undefined) return null;

    return (
        <div>
            <Heading level={"2"} size={"medium"} spacing>
                {t("familie.sivilstatus.sporsmal")}
            </Heading>
            <RadioGroup
                legend={t("system.familie.sivilstatus.sporsmal")}
                value={sivilstatus.sivilstatus}
                onChange={(sivilstatus) => {
                    setSivilstatus(sivilstatus);
                    if (!ektefelle) setEditMode(true);
                }}
            >
                <Radio value="gift">{t("familie.sivilstatus.gift")}</Radio>
                <Underskjema visible={sivilstatus.sivilstatus === "gift"} arrow={true}>
                    <EktefellerPlikterForsorge />
                    {editMode ? (
                        <EktefellePersonaliaForm
                            sivilstatus={sivilstatus}
                            setEktefelle={async (ektefelle, borSammen) => {
                                await setEktefelle(ektefelle, borSammen);
                                setEditMode(false);
                            }}
                        />
                    ) : (
                        <Systeminfo>
                            <EktefellePersonaliaBruker ektefelle={ektefelle} />
                            <div>
                                <Button onClick={() => setEditMode(true)}>Endre</Button>
                            </div>
                        </Systeminfo>
                    )}
                </Underskjema>
                <Radio value="ugift">{t("familie.sivilstatus.ugift")}</Radio>
                <Radio value="samboer">{t("familie.sivilstatus.samboer")}</Radio>
                <Radio value="enke">{t("familie.sivilstatus.enke")}</Radio>
                <Radio value="skilt">{t("familie.sivilstatus.skilt")}</Radio>
                <Radio value="separert">{t("familie.sivilstatus.separert")}</Radio>
            </RadioGroup>
        </div>
    );
};

export default Sivilstatus;
