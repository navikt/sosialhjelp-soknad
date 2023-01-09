import * as React from "react";
import classNames from "classnames";
import {SkjemaGruppe} from "nav-frontend-skjema";
import {SporsmalTekster} from "../../utils";
import {SporsmalHjelpetekst, SporsmalInfotekst} from "./SporsmalHjelpetekst";

export type SporsmalStyle = "normal" | "system" | "jaNeiSporsmal";

export enum LegendTittleStyle {
    DEFAULT = "skjema-fieldset--legend-title-default",
    NORMAL = "skjema-fieldset--legend-title-normal-tekst",
    FET_NORMAL = "skjema-fieldset--legend-title-normal-fet",
}

interface SporsmalProps {
    id?: string;
    children: React.ReactNode;
    htmlRef?: (c: any) => HTMLElement;
    stil?: SporsmalStyle;
    handleOnBlur?: (evt: any) => void;
    feil?: string;
    feilkode?: string;
    tekster: SporsmalTekster;
    legendTittelStyle?: LegendTittleStyle;
    faktumKey?: string;
    required?: boolean;
    noValidateOnBlur?: boolean;
    skjulLedetekst?: boolean;
}

const Sporsmal = ({
    id,
    children,
    feil,
    feilkode,
    tekster,
    skjulLedetekst,
    stil,
    legendTittelStyle = LegendTittleStyle.DEFAULT,
}: SporsmalProps) => {
    const sporsmalCls = classNames("skjema-sporsmal", {
        "skjema-sporsmal--noBottomPadding": stil === "system" || stil === "jaNeiSporsmal",
        "skjema-sporsmal--systeminfo": stil === "system",
        "skjema-sporsmal--jaNeiSporsmal": stil === "jaNeiSporsmal",
    });

    const cls = classNames("skjema-fieldset", {
        "skjema-fieldset--harFeil": !!feilkode,
    });

    return (
        <div id={id} className={sporsmalCls}>
            <SkjemaGruppe
                feil={feil}
                className={cls}
                legend={
                    <div className={legendTittelStyle}>
                        {tekster.sporsmal}
                        {!skjulLedetekst && tekster.hjelpetekst && <SporsmalHjelpetekst tekster={tekster} />}
                    </div>
                }
                description={!skjulLedetekst && tekster.infotekst && <SporsmalInfotekst tekster={tekster} />}
            >
                <div className="skjema-sporsmal__innhold">{children}</div>
            </SkjemaGruppe>
        </div>
    );
};

export default Sporsmal;
