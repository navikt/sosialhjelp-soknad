import * as React from "react";
import classNames from "classnames";
import {SkjemaGruppe} from "nav-frontend-skjema";
import {getIntlText, getIntlTextOrKey, SporsmalTekster} from "../../utils";
import styled from "styled-components";
import {HelpText} from "@navikt/ds-react";

export type SporsmalStyle = "normal" | "system" | "jaNeiSporsmal";

const StyledHelpText = styled.div`
    margin-left: 0.5rem;
    font-weight: 400;
    font-size: 1.125rem;
    display: inline-block;

    .navds-popover__content {
        max-width: 390px;
    }
`;

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
    tekster?: SporsmalTekster;
    sporsmal?: string;
    infotekst?: string;
    hjelpetekst?: string;
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
    ...restProps
}: SporsmalProps) => {
    const sporsmalCls = classNames("skjema-sporsmal", {
        "skjema-sporsmal--noBottomPadding": stil === "system" || stil === "jaNeiSporsmal",
        "skjema-sporsmal--systeminfo": stil === "system",
        "skjema-sporsmal--jaNeiSporsmal": stil === "jaNeiSporsmal",
    });

    const cls = classNames("skjema-fieldset", {
        "skjema-fieldset--harFeil": !!feilkode,
    });

    const {sporsmal, hjelpetekst, infotekst} = tekster || restProps;

    return (
        <div id={id} className={sporsmalCls}>
            <SkjemaGruppe
                feil={feil}
                className={cls}
                legend={
                    <div className={legendTittelStyle}>
                        {sporsmal}
                        {!skjulLedetekst && hjelpetekst && (
                            <StyledHelpText>
                                <HelpText>{hjelpetekst}</HelpText>
                            </StyledHelpText>
                        )}
                    </div>
                }
                description={
                    !skjulLedetekst && infotekst && <div className="skjema-sporsmal__infotekst">{infotekst}</div>
                }
            >
                <div className="skjema-sporsmal__innhold">{children}</div>
            </SkjemaGruppe>
        </div>
    );
};

export default Sporsmal;
