import * as React from "react";
import classNames from "classnames";
import {SkjemaGruppe} from "nav-frontend-skjema";
import {useIntl} from "react-intl";
import {getFaktumSporsmalTekst} from "../../utils";
import {SporsmalHjelpetekst, SporsmalInfotekst} from "./SporsmalHjelpetekst";

export type SporsmalStyle = "normal" | "system" | "jaNeiSporsmal";

export enum LegendTittleStyle {
    DEFAULT = "skjema-fieldset--legend-title-default",
    NORMAL = "skjema-fieldset--legend-title-normal-tekst",
    FET_NORMAL = "skjema-fieldset--legend-title-normal-fet",
}

export interface Props {
    id?: string;
    children: React.ReactNode;
    visible?: boolean;
    htmlRef?: (c: any) => HTMLElement;
    stil?: SporsmalStyle;
    tittelRenderer?: (title: string) => React.ReactNode;
    handleOnBlur?: (evt: any) => void;
    feil?: string;
    feilkode?: string;
    tekster?: any;
    sprakNokkel?: string;
    legendTittelStyle?: LegendTittleStyle;
    faktumKey?: string;
    required?: boolean;
    noValidateOnBlur?: boolean;
    visLedetekst?: boolean;
}

const Sporsmal = (props: Props) => {
    const intl = useIntl();

    const {id, visible, children, feil, feilkode, tekster, sprakNokkel, visLedetekst} = props;
    const ledeTekster: any = tekster ? tekster : getFaktumSporsmalTekst(intl, sprakNokkel ? sprakNokkel : "");
    if (visible === false) {
        return null;
    }

    const sporsmalCls = classNames("skjema-sporsmal", {
        "skjema-sporsmal--noBottomPadding": props.stil === "system" || props.stil === "jaNeiSporsmal",
        "skjema-sporsmal--systeminfo": props.stil === "system",
        "skjema-sporsmal--jaNeiSporsmal": props.stil === "jaNeiSporsmal",
    });

    const cls = classNames("skjema-fieldset", {
        "skjema-fieldset--harFeil": feilkode !== null && feilkode !== undefined,
    });

    const legendCls = props.legendTittelStyle ? props.legendTittelStyle : LegendTittleStyle.DEFAULT;
    const sporsmal = props.tittelRenderer ? props.tittelRenderer(ledeTekster.sporsmal) : ledeTekster.sporsmal;
    return (
        <div id={id} className={sporsmalCls}>
            <SkjemaGruppe
                feil={feil}
                className={cls}
                legend={
                    <div className={legendCls}>
                        {sporsmal}
                        {visLedetekst !== false && ledeTekster.hjelpetekst && (
                            <SporsmalHjelpetekst tekster={ledeTekster} />
                        )}
                    </div>
                }
                description={
                    visLedetekst !== false && ledeTekster.infotekst && <SporsmalInfotekst tekster={ledeTekster} />
                }
            >
                <div className="skjema-sporsmal__innhold">{children}</div>
            </SkjemaGruppe>
        </div>
    );
};

export default Sporsmal;
