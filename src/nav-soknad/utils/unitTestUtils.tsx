import {IntlProvider} from "react-intl";
import {ReactElement} from "react";
import * as React from "react";
import {mount, shallow, ReactWrapper} from "enzyme";
import createHistory from "history/createBrowserHistory";
import {avbrytSoknad} from "../../digisos/redux/soknad/soknadActions";
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import reducers from "../../digisos/redux/reducers";
import sagas from "../../rootSaga";
import {Provider} from "react-redux";
import {SoknadState} from "../../digisos/redux/soknad/soknadTypes";
import {createIntl} from "react-intl";

export const setupReactIntl = (intlMessages: any) => {
    const intl = createIntl({
        locale: "nb-NO",
        messages: intlMessages,
    });
    const nodeWithIntlProp = (node: ReactElement<any>) => React.cloneElement(node, {intl});
    // @ts-ignore
    const mountWithIntl = (node: ReactElement<any>, {context, ...options} = {}) => {
        return mount(nodeWithIntlProp(node), {
            ...options,
            context: {
                ...context,
                intl,
            },
        });
    };
    return mountWithIntl;
};

export const setupShallowReactIntl = (intlMessages: any) => {
    const intl = createIntl({
        locale: "nb-NO",
        messages: intlMessages,
    });
    const nodeWithIntlProp = (node: ReactElement<any>) => React.cloneElement(node, {intl});
    // @ts-ignore
    const shallowWithIntl = (node: ReactElement<any>, {context, ...options} = {}) => {
        return shallow(nodeWithIntlProp(node), {
            ...options,
            context: {
                ...context,
                intl,
            },
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

    intl.formatMessage = (verdi: IntlFormat): string => {
        return messages[verdi.id];
    };

    return intl;
};

export const TestContext: React.FunctionComponent<{messages: any; children: React.ReactChild}> = ({
    messages,
    children,
}) => {
    const history = createHistory({
        getUserConfirmation: (msg: any, callback: (flag: boolean) => void) => {
            // @ts-ignore
            const soknad: SoknadState = store.getState().soknad;
            if (soknad.behandlingsId && soknad.avbrytSoknadSjekkAktiv) {
                store.dispatch(avbrytSoknad());
                callback(false);
            } else {
                callback(true);
            }
        },
        basename: "/",
    });

    const devtools: any = (f: any) => f;
    const saga = createSagaMiddleware();
    const middleware = applyMiddleware(saga);
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
