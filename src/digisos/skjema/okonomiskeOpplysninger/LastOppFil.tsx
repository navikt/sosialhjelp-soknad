import * as React from "react";
import {Knapp} from "nav-frontend-knapper";
import {FormattedMessage} from "react-intl";
import {Opplysning} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {useDispatch, useSelector} from "react-redux";
import {DispatchProps} from "../../redux/reduxTypes";
import {lastOppFil} from "../../redux/fil/filActions";
import {FilState} from "../../redux/fil/filTypes";
import {State} from "../../redux/reducers";
import {REST_FEIL} from "../../redux/soknad/soknadTypes";

interface StoreToProps {
    behandlingsId: string | undefined;
    filopplasting: FilState;
}

interface OwnProps {
    opplysning: Opplysning;
    isDisabled: boolean;
    visSpinner: boolean;
}

type Props = OwnProps & StoreToProps & DispatchProps;

const LastOppFil = (props: {opplysning: Opplysning; isDisabled: boolean; visSpinner: boolean}) => {
    const behandlingsId = useSelector((state: State) => state.soknad.behandlingsId);
    const filopplasting = useSelector((state: State) => state.filopplasting);

    const antallFiler = useSelector((state: State) => state.okonomiskeOpplysninger.opplysningerSortert
        .map((opplysning: Opplysning) => opplysning.filer.length)
        .reduce((a: number, b: number) => a + b));

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
            dispatch(lastOppFil(props.opplysning, formDataList, behandlingsId));

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
            <Knapp
                type="hoved"
                id={props.opplysning.type.replace(/\./g, "_") + "_lastopp_knapp"}
                htmlType="button"
                disabled={props.isDisabled}
                spinner={props.visSpinner}
                onClick={() => {
                    handleOnClick();
                }}
                className="last-opp-vedlegg-knapp"
            >
                + <FormattedMessage id="opplysninger.vedlegg.knapp.tekst" />
            </Knapp>
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
                    {filopplasting.feilKode && filopplasting.opplysningtype === props.opplysning.type && filopplasting.feilKode !== REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR && (
                        <FormattedMessage id={filopplasting.feilKode} />
                    )}

                    {filopplasting.feilKode && filopplasting.opplysningtype === props.opplysning.type && filopplasting.feilKode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR && (
                        <FormattedMessage id={filopplasting.feilKode}
                        values={{antall: antallFiler}}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LastOppFil;
