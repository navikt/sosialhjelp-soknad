import * as React from "react";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {opprettSoknad} from "../../../generated/soknad-ressurs/soknad-ressurs";
import {logWarning} from "../../log/loggerUtils";
import {updateAdresse} from "../../../generated/adresse-ressurs/adresse-ressurs";
import {sendSoknad} from "../../../generated/soknad-actions/soknad-actions";
import {maximizeSoknad} from "./devUtils";
import digisosConfig from "../../config";

type UrlParams = Record<"behandlingsId" | "skjemaSteg", string>;

export const DeveloperToolkit = () => {
    const {behandlingsId} = useParams<UrlParams>();
    const navigate = useNavigate();
    useEffect(() => {
        logWarning("Viser utviklermeny. Dette skal ikke skje i prod!");
    }, []);

    const createFolkeregistrertSoknad = async () => {
        const {brukerBehandlingId} = await opprettSoknad();
        if (!brukerBehandlingId) throw new Error("ingen soknadId!");
        await updateAdresse(brukerBehandlingId, {valg: "folkeregistrert"});
        return brukerBehandlingId;
    };

    const navigateToNew = async (page: number) => {
        const soknadId = await createFolkeregistrertSoknad();
        navigate(`/skjema/${soknadId}/${page}`);
    };

    return (
        <div className={"!mt-0 p-2 w-full bg-[black] text-sm text-[#0f0] max-lg:hidden font-mono "}>
            <div className="flex justify-center gap-4">
                <div>Utviklermeny:</div>
                <button
                    className={"text-[#0c0] hover:text-[#0f0]"}
                    onClick={async () => {
                        navigate(`/informasjon`);
                    }}
                >
                    [ hovedmeny ]
                </button>
                <button
                    className={"text-[#0c0] hover:text-[#0f0]"}
                    onClick={async () => {
                        const soknadId = await createFolkeregistrertSoknad();
                        await maximizeSoknad(soknadId);
                        navigate(`/skjema/${soknadId}/8`);
                    }}
                >
                    [ lag maksimal søknad ]
                </button>
                <button
                    className={"text-[#0c0] hover:text-[#0f0]"}
                    onClick={async () => {
                        const soknadId = await createFolkeregistrertSoknad();
                        await maximizeSoknad(soknadId);
                        const {id} = await sendSoknad(soknadId);
                        window.location.href = `${digisosConfig.innsynURL}${id}/status`;
                    }}
                >
                    [ lag og send maksimal søknad ]
                </button>
            </div>
            <div className="flex justify-center gap-4">
                <div>Lag søknad og hopp til side:</div>
                {Array.from({length: 9}, (_, i) => i + 1).map((page) => (
                    <button key={page} className={"text-[#0c0] hover:text-[#0f0]"} onClick={() => navigateToNew(page)}>
                        {page}
                    </button>
                ))}
                <button
                    className={"text-[#0c0] hover:text-[#0f0]"}
                    onClick={async () =>
                        (window.location.href = `${digisosConfig.innsynURL}${await createFolkeregistrertSoknad()}/status`)
                    }
                >
                    innsyn
                </button>
            </div>
            {behandlingsId && (
                <div className="flex justify-center gap-4">
                    Aktiv: {behandlingsId}
                    <button className={"text-[#0c0] hover:text-[#0f0]"} onClick={async () => navigate("../9")}>
                        [ oppsummering ]
                    </button>
                    <button
                        className={"text-[#0c0] hover:text-[#0f0]"}
                        onClick={async () => {
                            const {id} = await sendSoknad(behandlingsId);
                            window.location.href = `${digisosConfig.innsynURL}${id}/status`;
                        }}
                    >
                        [ send inn ]
                    </button>
                </div>
            )}
        </div>
    );
};

export default DeveloperToolkit;
