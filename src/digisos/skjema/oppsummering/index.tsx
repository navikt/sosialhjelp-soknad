import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {finnOgOppdaterSoknadsmottakerStatus} from "../../redux/soknad/soknadActions";
import {useHistory} from "react-router-dom";

import {ApplicationSpinner} from "../../../nav-soknad/components/applicationSpinner/ApplicationSpinner";

const OppsummeringView = () => {
    const {behandlingsId} = useSelector((state: State) => state.soknad);

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        if (behandlingsId) {
            dispatch(finnOgOppdaterSoknadsmottakerStatus(behandlingsId, history));
        }
    }, [behandlingsId, history, dispatch]);

    return <ApplicationSpinner />;
};

export default OppsummeringView;
