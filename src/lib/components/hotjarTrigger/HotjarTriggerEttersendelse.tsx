import * as React from "react";
import {DigisosGammelEttersendelseHotjarTrigger, SoknadEttersendelseFeilerHotjarTrigger} from "./HotjarTrigger";
import {OrginalSoknad} from "../../redux/ettersendelse/ettersendelseTypes";

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
                    <SoknadEttersendelseFeilerHotjarTrigger />
                )}
                {!opprettNyEttersendelseFeilet && originalSoknad && originalSoknad.soknadsalderIMinutter > 60 && (
                    <DigisosGammelEttersendelseHotjarTrigger />
                )}
            </div>
        );
    }
}

export default HotjarTriggerEttersendelse;
