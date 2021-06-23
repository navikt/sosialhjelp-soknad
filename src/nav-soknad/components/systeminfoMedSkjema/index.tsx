import * as React from "react";
import Lenkeknapp from "../lenkeknapp/Lenkeknapp";
import Underskjema from "../underskjema";
import styled from "styled-components";

interface Props {
    /** Kalles når bruker velger å vise skjema */
    onVisSkjema: () => void;
    /** Kalles når bruker velger å avbryte endring */
    onSkjulSkjema: () => void;
    /** Skjema som viser når bruker ønsker å endre verdier */
    skjema: React.ReactNode;
    /** Informasjonen som er hentet opp fra system */
    children: React.ReactNode;
    /** Label - endre knapp */
    endreLabel: string;
    /** Label - avbryt endring knapp */
    avbrytLabel: string;
    /** Om skjema skal vises eller ikke */
    skjemaErSynlig: boolean;
}

const labelToId = (str: string) => str.replace(/\s+/g, "_").toLowerCase();

const StyledSysteminfoMedSkjema = styled.div``;

const Info = styled.div`
    margin-bottom: 1rem;
`;

export const SysteminfoMedSkjema = (props: Props) => {
    return (
        <StyledSysteminfoMedSkjema>
            <Underskjema arrow={false} visible={true} collapsable={false} stil="system">
                <Info>{props.children}</Info>

                <div>
                    {props.skjemaErSynlig && props.skjema}
                    {!props.skjemaErSynlig && (
                        <Lenkeknapp onClick={props.onVisSkjema} id={labelToId(props.endreLabel) + "_lenke"}>
                            {props.endreLabel}
                        </Lenkeknapp>
                    )}
                    {props.skjemaErSynlig && (
                        <div>
                            <Lenkeknapp onClick={props.onSkjulSkjema} id={labelToId(props.avbrytLabel) + "_lenke"}>
                                {props.avbrytLabel}
                            </Lenkeknapp>
                        </div>
                    )}
                </div>
            </Underskjema>
        </StyledSysteminfoMedSkjema>
    );
};
