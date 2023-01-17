import {isLocalhost, isMockAlt} from "../../utils";
import {useEffect} from "react";

export const HotjarTrigger = (props: {hotjarTrigger: string}) => {
    useEffect(() => {
        // hotjar ligger ikke på window som default
        // @ts-ignore
        if (typeof window.hj === "function" && !(isMockAlt() || isLocalhost())) {
            // @ts-ignore
            window.hj("trigger", props.hotjarTrigger);
        }
    }, [props.hotjarTrigger]);

    return <div />;
};

export const SoknadEttersendelseFeilerHotjarTrigger = () => (
    <HotjarTrigger hotjarTrigger="digisos_ettersende_gammel_soknad_feiler" />
);

export const DigisosGammelEttersendelseHotjarTrigger = () => (
    <HotjarTrigger hotjarTrigger="digisos_ettersende_gammel_soknad" />
);
