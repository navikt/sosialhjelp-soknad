import * as React from "react";
import Banner from "../banner/Banner";
import {isLocalhost} from "../../utils";
import {DeveloperToolkit} from "./DeveloperToolkit";
import {useTranslation} from "react-i18next";

const AppHeader = () => {
    const {t} = useTranslation("skjema");

    if (!isLocalhost(window.location.href)) {
        return <Banner>{t("skjema.tittel")}</Banner>;
    } else {
        return (
            <>
                <Banner>{t("skjema.tittel")}</Banner>
                <DeveloperToolkit />
            </>
        );
    }
};

export default AppHeader;
