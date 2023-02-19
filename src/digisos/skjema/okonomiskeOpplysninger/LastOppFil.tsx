import * as React from "react";
import {Fil, Opplysning, VedleggStatus} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../redux/reducers";
import {
    settFilOpplastingFerdig,
    settFilOpplastingPending,
    updateOpplysning,
} from "../../redux/okonomiskeOpplysninger/opplysningerActions";
import {
    detekterInternFeilKode,
    fetchUpload,
    fetchUploadIgnoreErrors,
    HttpStatus,
} from "../../../nav-soknad/utils/rest-utils";
import {setValideringsfeil} from "../../redux/validering/valideringActions";
import {ValideringsFeilKode} from "../../redux/validering/valideringActionTypes";
import {Dispatch} from "redux";
import {logInfo} from "../../../nav-soknad/utils/loggerUtils";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {useBehandlingsId} from "../../../lib/hooks/useBehandlingsId";
import {REST_FEIL} from "../../redux/soknadsdata/soknadsdataTypes";

const lastOppFil = (
    opplysning: Opplysning,
    formDataList: FormData[],
    behandlingsId: string,
    dispatch: Dispatch,
    setFeilkode: (value: string | null) => void
) => {
    setFeilkode(null);
    const url = `opplastetVedlegg/${behandlingsId}/${opplysning.type}`;

    const opplysningUpdated: Opplysning = {...opplysning};

    const filerUpdated: Fil[] = opplysning.filer.map((fil: Fil) => ({
        ...fil,
    }));
    (async () => {
        for (const formData of formDataList) {
            dispatch(settFilOpplastingPending(opplysning.type));

            try {
                const response = await fetchUpload<Fil>(url, formData);
                filerUpdated.push(response);
                opplysningUpdated.filer = filerUpdated;
                opplysningUpdated.vedleggStatus = VedleggStatus.LASTET_OPP;

                dispatch(updateOpplysning(opplysningUpdated));
                dispatch(settFilOpplastingFerdig(opplysning.type));
            } catch (reason) {
                if (reason.message === HttpStatus.UNAUTHORIZED) {
                    return;
                }
                let feilKode = detekterInternFeilKode(reason.toString());
                if (feilKode.toString() === "Error: Not Found") {
                    dispatch(setValideringsfeil(ValideringsFeilKode.FIL_EKSISTERER_IKKE, opplysning.type));
                } else {
                    // Kjør feilet kall på nytt for å få tilgang til feilmelding i JSON data:
                    const response = await fetchUploadIgnoreErrors(url, formData, "POST");
                    const ID = "id";
                    // @ts-ignore
                    if (response && response[ID]) {
                        // @ts-ignore
                        feilKode = response[ID];
                    }
                    setFeilkode(feilKode);
                    if (feilKode !== REST_FEIL.KRYPTERT_FIL && feilKode !== REST_FEIL.SIGNERT_FIL) {
                        logInfo("Last opp vedlegg feilet: " + reason.toString());
                    }
                }
                dispatch(settFilOpplastingFerdig(opplysning.type));
            }
        }
    })();
};

const LastOppFil = (props: {
    opplysning: Opplysning;
    isDisabled: boolean;
    visSpinner: boolean;
    feilkode: string | null;
    setFeilkode: (value: string | null) => void;
}) => {
    const behandlingsId = useBehandlingsId();
    const antallFiler = useSelector((state: State) =>
        state.okonomiskeOpplysninger.opplysningerSortert
            .map((opplysning: Opplysning) => opplysning.filer.length)
            .reduce((a: number, b: number) => a + b)
    );
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const vedleggElement = React.useRef<HTMLInputElement>(null);

    const handleFileUpload = (files: FileList) => {
        if (behandlingsId) {
            let formDataList: FormData[] = [];

            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();

                const fileName = files[i].name;
                const encoded = encodeURI(fileName);
                formData.append("file", files[i], encoded);
                formDataList[i] = formData;
            }
            lastOppFil(props.opplysning, formDataList, behandlingsId, dispatch, props.setFeilkode);

            if (vedleggElement && vedleggElement.current) {
                vedleggElement.current.value = "";
            }
        }
    };

    const handleOnClick = () => {
        if (vedleggElement && vedleggElement.current) {
            vedleggElement.current.click();
        }
    };

    return (
        <div>
            <Button
                variant="secondary"
                id={props.opplysning.type.replace(/\./g, "_") + "_lastopp_knapp"}
                disabled={props.isDisabled}
                onClick={() => {
                    handleOnClick();
                }}
                className="last-opp-vedlegg-knapp"
            >
                + {t("opplysninger.vedlegg.knapp.tekst")}
                {props.visSpinner && <Loader />}
            </Button>
            <input
                id={props.opplysning.type.replace(/\./g, "_") + "_skjult_upload_input"}
                ref={vedleggElement}
                onChange={(e) => {
                    if (e.target.files) {
                        handleFileUpload(e.target.files);
                    }
                }}
                type="file"
                className="visuallyhidden"
                tabIndex={-1}
                accept={
                    window.navigator.platform.match(/iPad|iPhone|iPod/) !== null
                        ? "*"
                        : "image/jpeg,image/png,application/pdf"
                }
                multiple
            />

            <div role="alert" aria-live="assertive">
                <div className="skjemaelement__feilmelding">
                    {props.feilkode &&
                        (props.feilkode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR
                            ? t(props.feilkode, {antall: antallFiler})
                            : t(props.feilkode))}
                </div>
            </div>
        </div>
    );
};

export default LastOppFil;
