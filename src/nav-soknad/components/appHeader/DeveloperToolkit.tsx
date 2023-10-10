import * as React from "react";
import {useNavigate, useParams} from "react-router";
import {logWarning} from "../../utils/loggerUtils";
import {useEffect} from "react";
import {opprettSoknad} from "../../../generated/soknad-ressurs/soknad-ressurs";

type UrlParams = Record<"behandlingsId" | "skjemaSteg", string>;

export const DeveloperToolkit = () => {
    const {behandlingsId} = useParams<UrlParams>();
    const navigate = useNavigate();
    useEffect(() => {
        logWarning("Viser utviklermeny. Dette skal ikke skje i prod!");
    }, []);

    return (
        <div className={"!mt-0 p-2 w-full bg-[black] text-[#0f0] max-lg:hidden font-mono "}>
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
                        const {brukerBehandlingId} = await opprettSoknad();
                        if (brukerBehandlingId) navigate(`/skjema/${brukerBehandlingId}/1`);
                    }}
                >
                    [ ny søknad ]
                </button>
            </div>
            {behandlingsId && (
                <div className="flex justify-center gap-4">
                    Aktiv: {behandlingsId}
                    <button className={"text-[#0c0] hover:text-[#0f0]"} onClick={async () => navigate("../9")}>
                        [ oppsummering ]
                    </button>
                </div>
            )}
        </div>
    );
};
