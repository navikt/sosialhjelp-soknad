import * as React from "react";
import {Sidetittel} from "nav-frontend-typografi";
import {CONTEXT_PATH} from "../../../configuration";

/**
 * Innhold som legges her er skjult på skjerm, men vises på utskrift
 */

export interface Props extends React.Props<any> {
    active?: boolean;
}

export interface SideProps extends React.Props<any> {
    tittel?: string;
}
export const Side: React.StatelessComponent<SideProps> = ({children, tittel}) => (
    <div className="utskrift__side">
        {tittel && <Sidetittel className="utskrift__sidetittel">{tittel}</Sidetittel>}
        {children}
    </div>
);

const Utskrift: React.StatelessComponent<Props> = (props) => {
    if (!props.active) {
        return null;
    }

    return (
        <div className="utskrift" role="presentation">
            <div className="utskrift__hode">
                <img src={`/${CONTEXT_PATH}/statisk/bilder/nav-logo.png`} alt="" width="90" height="56" />
            </div>
            <div className="utskrift__innhold">{props.children}</div>
        </div>
    );
};

export default Utskrift;
