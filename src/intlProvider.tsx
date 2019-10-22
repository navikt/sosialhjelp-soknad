import * as React from "react";
import {IntlProvider as Provider} from "react-intl";
import {connect} from "react-redux";
import {DispatchProps} from "./digisos/redux/reduxTypes";
import {State} from "./digisos/redux/reducers";
import {LedeteksterState} from "./digisos/redux/ledetekster/ledeteksterTypes";

interface StateProps {
    ledetekster: LedeteksterState
}
interface IntlProviderProps {
    children: React.ReactNode;
}


type Props = StateProps & IntlProviderProps & DispatchProps;

const IntlProvider: React.FC<Props> = (props: Props) => {
    let {children, ledetekster} = props;
    const locale = "nb";

    return (
        <Provider messages={ledetekster.data ? ledetekster.data : ""} defaultLocale="nb" locale={locale}>
            {children}
        </Provider>
    );
};

export default connect((state: State) => {
    return {
        ledetekster: state.ledetekster,
    };
})(IntlProvider);
