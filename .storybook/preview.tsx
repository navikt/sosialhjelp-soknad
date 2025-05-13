import type {Preview, ReactRenderer} from "@storybook/react";

import "../src/index.css";
import Providers from "../src/app/providers";
import {DecoratorFunction} from "storybook/internal/types";
import {Suspense, useEffect} from "react";

import i18n from "../src/lib/i18n/reacti18Next";
import {I18nextProvider} from "react-i18next";

const withI18next: DecoratorFunction<ReactRenderer, {[x: string]: any}> = (Story, context) => {
    const {locale} = context.globals;

    // When the locale global changes
    // Set the new locale in i18n
    useEffect(() => {
        i18n.changeLanguage(locale);
    }, [locale]);

    return (
        <Suspense fallback={<div>loading translations...</div>}>
            <I18nextProvider i18n={i18n}>
                <Story />
            </I18nextProvider>
        </Suspense>
    );
};

const AppDecorator: DecoratorFunction<ReactRenderer, {[x: string]: any}> = (storyFn) => {
    return (
        <Suspense fallback={<div>loading translations...</div>}>
            <I18nextProvider i18n={i18n}>
                <Providers locale={"nb"}>{storyFn()}</Providers>
            </I18nextProvider>
        </Suspense>
    );
};
export const globalTypes = {
    locale: {
        name: "Locale",
        description: "Internationalization locale",
        toolbar: {
            icon: "globe",
            items: [
                {value: "en", title: "English"},
                {value: "nb", title: "Norsk bokmål"},
                {value: "nn", title: "Norsk nynorsk"},
            ],
            showName: true,
        },
    },
};
const preview: Preview = {
    decorators: [AppDecorator, withI18next],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
