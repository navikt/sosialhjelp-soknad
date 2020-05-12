import * as React from "react";
import {FormattedMessage} from "react-intl";
import Banner from "../banner/Banner";

const AppHeader: React.FC = () => {
    return (
        <Banner>
            <FormattedMessage id="skjema.tittel" />
        </Banner>
    );
};

export default AppHeader;
