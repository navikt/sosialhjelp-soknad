import * as React from "react";
import {isLocalhost} from "../../utils";
import {DeveloperToolkit} from "./DeveloperToolkit";
import {useTranslation} from "react-i18next";
import {Heading} from "@navikt/ds-react";
import cx from "classnames";

const AppHeader = ({className}: {className?: string}) => {
    const {t} = useTranslation("skjema");
    const styles = cx("text-center p-4 bg-[#9bd0b0]", className);
    if (isLocalhost(window.location.href))
        return (
            <>
                <DeveloperToolkit />
                <Heading level="1" size="small" className={styles}>
                    {t("skjema.tittel")}
                </Heading>
            </>
        );

    return (
        <Heading level="1" size="small" className={styles}>
            {t("skjema.tittel")}
        </Heading>
    );
};

export default AppHeader;
