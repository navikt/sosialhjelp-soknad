import * as React from "react";
import {startSoknad} from "../../../lib/StartSoknad";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {setSoknadPending, hentSoknadOk} from "../../../digisos/redux/soknad/soknadActions";
import {logWarning} from "../../utils/loggerUtils";
import {UrlParams} from "../SkjemaSteg/UseReduxSynchronizer";
import {useEffect} from "react";

export const DeveloperToolkit = () => {
    const {behandlingsId} = useParams<UrlParams>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => logWarning("Viser utviklermeny. Dette skal ikke skje i prod!", true), []);

    return (
        <div className={"!mt-0 p-2 bg-[black] text-[#0f0] font-mono "}>
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
                            dispatch(setSoknadPending(behandlingsId));
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
