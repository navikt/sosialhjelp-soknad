import * as React from "react";
import {startSoknad} from "../../../lib/StartSoknad";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {hentSoknad, hentSoknadOk} from "../../../digisos/redux/soknad/soknadActions";
import {logWarning} from "../../utils/loggerUtils";
import {useBehandlingsId} from "../../hooks/useBehandlingsId";

export const DeveloperToolkit = () => {
    const behandlingsId = useBehandlingsId();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    logWarning("Viser utviklermeny. Dette skal ikke skje i prod!");

    return (
        <div className={"p-2 bg-[black] text-[#0f0] font-mono "}>
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
                        const behandlingsId = await startSoknad(dispatch);
                        if (behandlingsId) {
                            dispatch(hentSoknad(behandlingsId));
                            dispatch(hentSoknadOk(true, behandlingsId));
                            navigate(`/skjema/${behandlingsId}/1`);
                        }
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
