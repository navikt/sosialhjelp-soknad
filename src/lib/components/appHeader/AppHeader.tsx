"use client";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {Heading} from "@navikt/ds-react";
import cx from "classnames";
import digisosConfig from "../../config";
const DeveloperToolkit = React.lazy(() => import("./DeveloperToolkit"));

export const AppHeader = ({className}: {className?: string}) => {
    const {t} = useTranslation("skjema");
    const styles = cx("text-center p-4 bg-[#9bd0b0]", className);

    return (
        <>
            {digisosConfig.showDevPanel && <DeveloperToolkit />}
            <Heading level="1" size="small" className={styles}>
                {t("skjema.tittel")}
            </Heading>
        </>
    );
};
