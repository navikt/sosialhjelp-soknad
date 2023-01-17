import * as React from "react";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import {Systeminfo, SysteminfoItem} from "../../../../nav-soknad/components/systeminfo/Systeminfo";
import {FormattedMessage} from "react-intl";
import {useBehandlingsId} from "../../../../nav-soknad/hooks/useBehandlingsId";
import {useAlgebraic} from "../../../../lib/hooks/useAlgebraic";
import {useHentBasisPersonalia} from "../../../../generated/basis-personalia-ressurs/basis-personalia-ressurs";
import {useErrorHandler} from "../../../../lib/hooks/useErrorHandler";

// TODO: Figure out error handling
export const BasisPersonaliaData = () => {
    const {request} = useAlgebraic(useHentBasisPersonalia(useBehandlingsId()));
    const errorHandler = useErrorHandler();

    return request.match({
        NotAsked: () => null,
        Loading: () => <TextPlaceholder lines={3} />,
        Done: (response) =>
            response.match({
                Error: errorHandler,
                Ok: ({fulltNavn, fodselsnummer, statsborgerskap}) => (
                    <Systeminfo>
                        <SysteminfoItem label={<FormattedMessage id={"kontakt.system.personalia.navn"} />}>
                            {fulltNavn}
                        </SysteminfoItem>
                        <SysteminfoItem label={<FormattedMessage id={"kontakt.system.personalia.fnr"} />}>
                            {fodselsnummer}
                        </SysteminfoItem>
                        <SysteminfoItem label={<FormattedMessage id={"kontakt.system.personalia.statsborgerskap"} />}>
                            {statsborgerskap ?? "Ukjent/statsløs"}
                        </SysteminfoItem>
                    </Systeminfo>
                ),
            }),
    });
};
