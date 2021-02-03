import * as React from "react";
import * as classNames from "classnames";
import {SkjemaGruppe} from "nav-frontend-skjema";
import {injectIntl} from "react-intl";
import {getFaktumSporsmalTekst, IntlProps} from "../../utils";
import {SporsmalHjelpetekst, SporsmalInfotekst} from "./SporsmalHjelpetekst";

export type SporsmalStyle = "normal" | "system" | "jaNeiSporsmal";

export enum LegendTittleStyle {
    DEFAULT = "skjema-fieldset--legend-title-default",
    NORMAL = "skjema-fieldset--legend-title-normal-tekst",
    FET_NORMAL = "skjema-fieldset--legend-title-normal-fet",
}

export interface OwnProps {
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

type Props = OwnProps & IntlProps;

class Sporsmal extends React.Component<Props, {}> {
    render() {
        const {id, visible, children, feil, feilkode, tekster, intl, sprakNokkel, visLedetekst} = this.props;
        const ledeTekster: any = tekster ? tekster : getFaktumSporsmalTekst(intl, sprakNokkel ? sprakNokkel : "");
        if (visible === false) {
            return null;
        }
        // @ts-ignore
        const sporsmalCls = classNames("skjema-sporsmal", {
            "skjema-sporsmal--noBottomPadding": this.props.stil === "system" || this.props.stil === "jaNeiSporsmal",
            "skjema-sporsmal--systeminfo": this.props.stil === "system",
            "skjema-sporsmal--jaNeiSporsmal": this.props.stil === "jaNeiSporsmal",
        });
        // @ts-ignore
        const cls = classNames("skjema-fieldset", {
            "skjema-fieldset--harFeil": feilkode !== null && feilkode !== undefined,
        });

        const legendCls = this.props.legendTittelStyle ? this.props.legendTittelStyle : LegendTittleStyle.DEFAULT;
        const sporsmal = this.props.tittelRenderer
            ? this.props.tittelRenderer(ledeTekster.sporsmal)
            : ledeTekster.sporsmal;
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
    }
}

export default injectIntl(Sporsmal);
