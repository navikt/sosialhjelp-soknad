import * as React from "react";
import {FormattedMessage} from "react-intl";
import Banner from "../banner/Banner";
import {isLocalhost} from "../../utils";
import {DeveloperToolkit} from "./DeveloperToolkit";

const AppHeader: React.FC = () => {
    if (!isLocalhost(window.location.href)) {
        return (
            <Banner>
                <FormattedMessage id="skjema.tittel" />
            </Banner>
        );
    } else {
        return (
            <>
                <Banner>
                    <FormattedMessage id="skjema.tittel" />
                </Banner>
                <DeveloperToolkit />
            </>
        );
    }
};

export default AppHeader;
