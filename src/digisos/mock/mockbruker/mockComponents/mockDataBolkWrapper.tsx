import * as React from "react";
import {Panel} from "nav-frontend-paneler";
import {Undertittel} from "nav-frontend-typografi";
import {Checkbox} from "nav-frontend-skjema";

interface Props {
    tittel: string | undefined;
    value?: boolean | undefined;
    callback?: any | undefined;
    booleanText_true?: string | undefined
    booleanText_false?: string | undefined
}

class MockDataBolkWrapper extends React.Component<Props, {}> {

    render() {

        const children = this.props.children;

        let booleanLabel = "";
        if(this.props.booleanText_true && this.props.booleanText_false) {
            if(this.props.value) {
                booleanLabel = this.props.booleanText_true;
            } else {
                booleanLabel = this.props.booleanText_false;
            }
        }

        return (
            <Panel className="mock-panel">
                {this.props.tittel && (
                    <div className={"mock-bruker-luft-under mock-pa_en_linje"}>
                        <Undertittel className="mock-50-prosent-vid"> {this.props.tittel} </Undertittel>
                        {this.props.callback &&
                        <Checkbox label={booleanLabel}
                                  onChange={(evt: any) => this.props.callback(evt.target.checked)}
                                  value={JSON.stringify(this.props.value)}
                                  className="mock-mindre-luft"
                        />
                        }
                    </div>
                )
                }
                <div className="mock-data-bolk__body">
                    {children}
                </div>
            </Panel>
        )
    }
}

export default MockDataBolkWrapper;