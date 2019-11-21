import * as React from "react";
import {Panel} from "nav-frontend-paneler";
import {Undertittel} from "nav-frontend-typografi";

interface Props {
    tittel: string | undefined;
}

class MockDataBolkWrapper extends React.Component<Props, {}> {

    render() {

        const children = this.props.children;

        return (
            <Panel className="mock-panel">
                {this.props.tittel && (
					<div className={"mock-bruker-luft-under"}>
						<Undertittel> {this.props.tittel} </Undertittel>
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