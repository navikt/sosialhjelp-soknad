import * as React from "react";
import {DigisosGammelEttersendelseHotjarTrigger, SoknadEttersendelseFeilerHotjarTrigger} from "./HotjarTrigger";
import {OrginalSoknad} from "../../../digisos/redux/ettersendelse/ettersendelseTypes";

interface Props {
    opprettNyEttersendelseFeilet: boolean;
    originalSoknad?: OrginalSoknad;
}

class HotjarTriggerEttersendelse extends React.Component<Props> {
    render() {
        const {opprettNyEttersendelseFeilet, originalSoknad} = this.props;
        return (
            <div>
                {opprettNyEttersendelseFeilet && originalSoknad && originalSoknad.soknadsalderIMinutter > 60 && (
                    <SoknadEttersendelseFeilerHotjarTrigger>
                        <div />
                    </SoknadEttersendelseFeilerHotjarTrigger>
                )}
                {!opprettNyEttersendelseFeilet && originalSoknad && originalSoknad.soknadsalderIMinutter > 60 && (
                    <DigisosGammelEttersendelseHotjarTrigger>
                        <div />
                    </DigisosGammelEttersendelseHotjarTrigger>
                )}
            </div>
        );
    }
}

export default HotjarTriggerEttersendelse;
