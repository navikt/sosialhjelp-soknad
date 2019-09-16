import * as Enzyme from 'enzyme';
import {IntlProvider} from "react-intl";
import {ReactElement} from "react";
import * as React from "react";
import {mount, shallow} from "enzyme";
import {ReactWrapper} from "enzyme";
import createHistory from "history/createBrowserHistory";
import {SoknadState} from "../redux/reduxTypes";
import {avbrytSoknad} from "../redux/soknad/soknadActions";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "../../digisos/redux/reducers";
import sagas from "../../rootSaga";
import {Provider} from "react-redux";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
import {routerMiddleware} from "connected-react-router";
import { createIntl } from "react-intl";

const prettier = require("prettier");

export const configEnzyme = () => {
    Enzyme.configure({adapter: new ReactSixteenAdapter()});
};

export const setupReactIntl = (intlMessages: any) => {
    const intl = createIntl(
        {
            locale: 'nb-NO',
            messages: intlMessages
        }
    );
    const nodeWithIntlProp = (node: ReactElement<any>) => React.cloneElement(node, {intl});
    // @ts-ignore
    const mountWithIntl = (node: ReactElement<any>, {context, ...options} = {}) => {
        return mount(nodeWithIntlProp(node), {
            ...options,
            context: {
                ...context,
                intl
            }
        });
    };
    return mountWithIntl;
};

export const setupShallowReactIntl = (intlMessages: any) => {
    const intl = createIntl(
        {
            locale: 'nb-NO',
            messages: intlMessages
        }
    );
    const nodeWithIntlProp = (node: ReactElement<any>) => React.cloneElement(node, {intl});
    // @ts-ignore
    const shallowWithIntl = (node: ReactElement<any>, {context, ...options} = {}) => {
        return shallow(nodeWithIntlProp(node), {
            ...options,
            context: {
                ...context,
                intl
            }
        });
    };
    return shallowWithIntl;
};

export const harCheckboks = (wrapper: ReactWrapper) => wrapper.find('input[type="checkbox"]').length > 0;

export const harInputfelt = (wrapper: ReactWrapper, type?: string) => {
    const inputType = type ? type : "text";
    return wrapper.find('input[type="' + inputType + '"]').length > 0;
};

export const createMockIntl = (messages: any) => {
    const intl: any = {};

    interface IntlFormat {
        id: string;
    }

    intl.formatHTMLMessage = (verdi: IntlFormat): string => {
        return messages[verdi.id];
    };

    intl.formatMessage = (verdi: IntlFormat): string => {
        return messages[verdi.id];
    };

    return intl;
};

export const TestContext: React.FunctionComponent<{ messages: any, children: React.ReactChild }> = ({messages, children}) => {

    const history = createHistory({
        getUserConfirmation: (msg: any, callback: (flag: boolean) => void) => {
            // @ts-ignore
            const soknad: SoknadState = store.getState().soknad;
            if (soknad.data.brukerBehandlingId && soknad.avbrytSoknadSjekkAktiv) {
                store.dispatch(avbrytSoknad("START"));
                callback(false);
            } else {
                callback(true);
            }
        },
        basename: "/"
    });

    const devtools: any = (f: any) => f;
    const saga = createSagaMiddleware();
    const middleware = applyMiddleware(thunk, saga, routerMiddleware(history));
    const store = createStore(reducers, devtools, middleware);
    saga.run(sagas);

    return (
        <Provider store={store}>
            <IntlProvider messages={messages} defaultLocale="nb" locale={"nb"}>
                {children}
            </IntlProvider>
        </Provider>
    );
};
