import * as React from "react";
import {Underskjema} from "../../lib/components/Underskjema";
import {EktefellePersonaliaForm} from "./EktefellePersonaliaForm";
import {useTranslation} from "react-i18next";
import {Button, Heading, Loader, Radio, RadioGroup} from "@navikt/ds-react";
import {useSivilstatus} from "../../lib/hooks/data/useSivilstatus";

import {EktefellerPlikterForsorge} from "./EktefellePlikterForsorge";
import {EktefellePersonaliaBruker} from "./EktefellePersonaliaBruker";
import {Systeminfo} from "../../lib/components/systeminfo/Systeminfo";

export const Sivilstatus = () => {
    const {t} = useTranslation("skjema");
    const {sivilstatus, ektefelle, setSivilstatus, setEktefelle, isDelayedPending} = useSivilstatus();
    const [editMode, setEditMode] = React.useState(false);
    if (sivilstatus === undefined) return null;

    return (
        <div>
            <Heading level={"2"} size={"medium"} spacing>
                {t("familie.sivilstatus.sporsmal")}
            </Heading>
            <RadioGroup
                legend={
                    <div>
                        {t("system.familie.sivilstatus.sporsmal")}
                        {isDelayedPending && <Loader />}
                    </div>
                }
                value={sivilstatus}
                onChange={(sivilstatus) => {
                    setSivilstatus(sivilstatus);
                    if (!ektefelle) setEditMode(true);
                }}
            >
                <Radio value="GIFT">{t("familie.sivilstatus.gift.stringValue")}</Radio>
                <Underskjema visible={sivilstatus === "GIFT"} arrow>
                    <EktefellerPlikterForsorge className={"mb-6! lg:mb-12!"} />
                    {editMode ? (
                        <EktefellePersonaliaForm
                            sivilstatus={sivilstatus}
                            ektefelle={ektefelle}
                            setEktefelle={(ektefelle) => {
                                setEktefelle(ektefelle);
                                setEditMode(false);
                            }}
                        />
                    ) : (
                        <Systeminfo className={"mb-4"}>
                            <EktefellePersonaliaBruker ektefelle={ektefelle} isLoading={isDelayedPending} />
                            <div>
                                <Button onClick={() => setEditMode(true)}>Endre</Button>
                            </div>
                        </Systeminfo>
                    )}
                </Underskjema>
                <Radio value="UGIFT">{t("familie.sivilstatus.ugift")}</Radio>
                <Radio value="SAMBOER">{t("familie.sivilstatus.samboer")}</Radio>
                <Radio value="ENKE">{t("familie.sivilstatus.enke")}</Radio>
                <Radio value="SKILT">{t("familie.sivilstatus.skilt")}</Radio>
                <Radio value="SEPARERT">{t("familie.sivilstatus.separert")}</Radio>
            </RadioGroup>
        </div>
    );
};
