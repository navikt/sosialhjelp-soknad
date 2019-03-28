import * as React from "react";
import {Column, Row} from "nav-frontend-grid";
import InputEnhanced from "../../../../nav-soknad/faktum/InputEnhanced";

export interface RadMedBelopProps {
    rowKey: string;
    belop: number;
    onChange: (belop: number) => void;
    onBlur: () => void;
    textKey: string
}

// TODO: parseStringToInt. Gi feil hvis ugyldig belop.

class RadMedBelopView extends React.Component<RadMedBelopProps, {}>{

    render(){

        const { rowKey, belop, onChange, onBlur, textKey } = this.props;

        return(
            <div className="container--noPadding container-fluid">
                <Row key={rowKey} className="opplysning__row">
                    <Column xs={"12"} md={"6"}/>
                        <InputEnhanced
                            onChange={(input) => onChange(parseInt(input, 10))}
                            onBlur={() => onBlur()}
                            faktumKey={textKey}
                            verdi={belop ? belop.toString() : ""}
                            required={false}
                            bredde={"S"}
                        />
                </Row>
            </div>
        )
    }
}

export default RadMedBelopView;