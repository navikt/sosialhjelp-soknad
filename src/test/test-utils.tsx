import {render, RenderOptions} from "@testing-library/react";
import {ReactElement, Suspense} from "react";
import * as React from "react";
import i18n from "../lib/i18n/reacti18Next";
import {I18nextProvider} from "react-i18next";

const Wrapper = ({children}: {children: React.ReactNode}) => (
    <Suspense fallback={null}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Suspense>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
    render(ui, {wrapper: Wrapper, ...options});

export * from "@testing-library/react";
export {customRender as render};
