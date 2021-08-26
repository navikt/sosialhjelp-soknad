import * as React from "react";
import {IntlProvider as Provider} from "react-intl";
import {useSelector} from "react-redux";
import {State} from "./digisos/redux/reducers";

interface Props {
    children: React.ReactNode;
}

const IntlProvider = (props: Props) => {
    const ledetekster = useSelector((state: State) => state.ledetekster);
    const locale = "nb";

    return (
        <Provider messages={ledetekster.data ? ledetekster.data : ""} defaultLocale="nb" locale={locale}>
            {props.children}
        </Provider>
    );
};

export default IntlProvider;
