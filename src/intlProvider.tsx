import * as React from "react";
import {addLocaleData, IntlProvider as Provider} from "react-intl";
import * as nb from "react-intl/locale-data/nb";
import {connect} from "react-redux";
import {LedetekstState} from "./digisos/redux/ledetekster/ledeteksterTypes";
import {DispatchProps} from "./digisos/redux/reduxTypes";
import {State} from "./digisos/redux/reducers";

addLocaleData(nb);

interface StateProps {
    ledetekster: LedetekstState
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
