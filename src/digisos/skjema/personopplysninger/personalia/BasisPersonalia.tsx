import * as React from "react";
import TextPlaceholder from "../../../../nav-soknad/components/animasjoner/placeholder/TextPlaceholder";
import Sporsmal from "../../../../nav-soknad/components/sporsmal/Sporsmal";
import {Systeminfo, SysteminfoItem} from "../../../../nav-soknad/components/systeminfo/Systeminfo";
import {getFaktumSporsmalTekst} from "../../../../nav-soknad/utils";
import {FormattedMessage, useIntl} from "react-intl";
import {useBehandlingsId} from "../../../../nav-soknad/hooks/useBehandlingsId";
import {BasisPersonaliaFrontend} from "../../../../generated/model";
import {useAlgebraic} from "../../../../lib/hooks/useAlgebraic";
import {useHentBasisPersonalia} from "../../../../generated/basis-personalia-ressurs/basis-personalia-ressurs";

// TODO: Figure out error handling
const BasisPersonaliaData = () => {
    const behandlingsId = useBehandlingsId();

    const request = useAlgebraic<BasisPersonaliaFrontend>(useHentBasisPersonalia(behandlingsId));

    return request.match({
        NotAsked: () => null,
        Loading: () => <TextPlaceholder lines={3} />,
        Done: (response) =>
            response.match({
                Error: () => <pre>Systemfeil</pre>,
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

export const BasisPersonaliaView = () => {
    const intl = useIntl();
    return (
        <Sporsmal tekster={getFaktumSporsmalTekst(intl, "kontakt.system.personalia")} stil={"system"}>
            <BasisPersonaliaData />
        </Sporsmal>
    );
};

export default BasisPersonaliaView;
