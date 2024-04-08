import * as React from "react";
import {useTranslation} from "react-i18next";
import {Heading} from "@navikt/ds-react";
import cx from "classnames";
import {isLocalhost, isMockAlt, isStaging} from "../../utils";
const DeveloperToolkit = React.lazy(() => import("./DeveloperToolkit"));

export const AppHeader = ({className}: {className?: string}) => {
    const {t} = useTranslation("skjema");
    const styles = cx("text-center p-4 bg-[#9bd0b0]", className);

    return (
        <>
            {(isLocalhost(window.location.href) ||
                isMockAlt(window.location.href) ||
                isStaging(window.location.href)) && <DeveloperToolkit />}
            <Heading level="1" size="small" className={styles}>
                {t("skjema.tittel")}
            </Heading>
        </>
    );
};
