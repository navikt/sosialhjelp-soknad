import * as React from "react";
import {connect} from "react-redux";
import {DispatchProps} from "../../redux/reduxTypes";
import "whatwg-fetch";
import {tilMock} from "../../redux/navigasjon/navigasjonActions";
import {fetchPost} from "../../../nav-soknad/utils/rest-utils";
import {settMockIdent} from "../mockReducer";
import AlertStripe from "nav-frontend-alertstriper";
import {Input} from "nav-frontend-skjema";
import {Innholdstittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import Panel from "nav-frontend-paneler";

export interface StateProps {
    router: any;
}

type Props = StateProps & DispatchProps;

interface State {
    uid: string;
    loading: boolean;
}

class MockLogin extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            uid: Math.round(Math.random() * 999999999999).toString(),
            loading: false,
        };
    }

    loginOgGaTilMockSide() {
        this.setState({loading: true});
        const uidObject = {
            uid: this.state.uid,
        };
        this.props.dispatch(settMockIdent(this.state.uid));
        fetchPost("internal/mock/tjeneste/uid", JSON.stringify(uidObject)).then(() => {
            this.props.dispatch(tilMock());
        });
    }

    keyPress(e: any) {
        if (e.key === "Enter") {
            let elementById: HTMLElement | null = document.getElementById("login-button");
            if (elementById) {
                elementById.click();
            }
        }
    }

    render() {
        return (
            <div className="mock-body">
                <div className="mock-login-wrapper">
                    <Panel className={"mock-login-panel"}>
                        <br />
                        <AlertStripe type="advarsel">
                            DETTE ER KUN FOR TESTING! Data du legger inn her er tilgjengelig for alle. Ikke legg inn noe
                            sensitiv informasjon!
                        </AlertStripe>

                        <br />

                        <Innholdstittel>Mock login</Innholdstittel>

                        <br />

                        <Input
                            label={"Skriv en tilfeldig ID"}
                            onKeyPress={this.keyPress}
                            value={this.state.uid}
                            onChange={(evt: any) => this.setState({uid: evt.target.value})}
                            autoFocus={true}
                        />

                        <div>
                            <Hovedknapp
                                id="login-button"
                                spinner={this.state.loading}
                                disabled={this.state.loading || this.state.uid.length === 0}
                                onClick={() => this.loginOgGaTilMockSide()}
                            >
                                Login
                            </Hovedknapp>
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
}

export default connect((state: StateProps) => ({
    router: state.router,
}))(MockLogin);
