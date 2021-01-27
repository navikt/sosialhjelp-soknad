import * as React from "react";
import {
    lastOppEttersendelseVedlegg,
    setAdvarselManglerVedlegg,
    slettEttersendtVedlegg,
} from "../../redux/ettersendelse/ettersendelseActions";
import {DispatchProps} from "../../redux/reduxTypes";
import {connect, useDispatch, useSelector} from "react-redux";
import {downloadAttachedFile} from "../../../nav-soknad/utils/rest-utils";
import {MargIkon, MargIkoner} from "./margIkoner";
import AvsnittMedMarger from "./avsnittMedMarger";
import {FormattedMessage} from "react-intl";
import {EttersendelseState, EttersendelseVedleggBackend} from "../../redux/ettersendelse/ettersendelseTypes";
import {Fil, OpplysningType} from "../../redux/okonomiskeOpplysninger/opplysningerTypes";
import {State} from "../../redux/reducers";
import {REST_FEIL, REST_STATUS} from "../../redux/soknad/soknadTypes";
import PaperclipIcon from "../../../nav-soknad/components/digisosIkon/paperclipIcon";
import {Knapp} from "nav-frontend-knapper";
import {SkjemaGruppe} from "nav-frontend-skjema";
import FileUpload from "../../../nav-soknad/components/fileUpload/FileUpload";

export interface Props {
    ettersendelseAktivert: boolean;
    title: React.ReactNode;
    children: React.ReactNode;
    vedlegg: EttersendelseVedleggBackend;
    feilKode?: string;
    dispatch?: any;
}

const EttersendelseVedlegg = (props: Props) => {
    const dispatch = useDispatch();

    const [filnavn, setFilnavn] = React.useState<string | null>(null);
    const ettersendelse = useSelector((state: State) => state.ettersendelse);

    const {feiletVedleggId, opplastingStatus, ettersendStatus, opplastingVedleggType} = ettersendelse;
    const opplastingsFeil: boolean = opplastingStatus === REST_STATUS.FEILET && feiletVedleggId === props.vedlegg.type;
    const visFeilFiltypeFeilmelding: boolean = opplastingsFeil && props.feilKode === REST_FEIL.FEIL_FILTPYE;

    const removeFile = (filId: string, opplysningType: OpplysningType) => {
        const {brukerbehandlingId} = ettersendelse;
        if (brukerbehandlingId) {
            dispatch(slettEttersendtVedlegg(brukerbehandlingId, filId, opplysningType));
        }
    };

    const handleFileUpload = (files: FileList | null) => {
        const {brukerbehandlingId} = ettersendelse;
        if (!files) {
            return;
        }
        if (files.length !== 1) {
            return;
        }
        dispatch(setAdvarselManglerVedlegg(false));
        const formData = new FormData();
        formData.append("file", files[0], files[0].name);
        setFilnavn(files[0].name);
        if (brukerbehandlingId) {
            dispatch(lastOppEttersendelseVedlegg(brukerbehandlingId, props.vedlegg.type, formData));
        }
    };

    const getErrorMessage = () => {
        if (opplastingsFeil) {
            if (props.feilKode === REST_FEIL.SAMLET_VEDLEGG_STORRELSE_FOR_STOR_ETTERSENDELSE) {
                return <FormattedMessage id={props.feilKode} />;
            } else {
                if (visFeilFiltypeFeilmelding) {
                    return (
                        <>
                            {filnavn} <FormattedMessage id="fil.feil.format" />
                        </>
                    );
                } else {
                    return (
                        <>
                            {filnavn}{" "}
                            <FormattedMessage id={props.feilKode ? props.feilKode : "opplysninger.vedlegg.ugyldig"} />
                        </>
                    );
                }
            }
        }
    };

    return (
        <div className="vedleggsliste__detalj">
            <h3>{props.title}</h3>
            <FileUpload
                spinner={props.vedlegg.type === opplastingVedleggType}
                disabled={ettersendStatus === REST_STATUS.PENDING || opplastingStatus === REST_STATUS.PENDING}
                onChange={(e) => handleFileUpload(e.target.files)}
                feil={getErrorMessage()}
            />

            {props.vedlegg?.filer.map((fil: Fil) => {
                const lastNedUrl = `opplastetVedlegg/${fil.uuid}/fil`;
                return (
                    <div key={fil.uuid} className="vedleggsliste__filnavn_wrapper">
                        <button
                            className="linkbutton linkbutton--normal vedleggsliste__filnavn_button"
                            title="Last ned vedlegg"
                            onClick={() => downloadAttachedFile(lastNedUrl)}
                        >
                            <PaperclipIcon />
                            <div className="vedleggsliste__filnavn_tekst">{fil.filNavn}</div>
                        </button>
                        <div className="vedleggsliste__fil_slett_wrapper">
                            <button
                                className="linkbutton linkbutton--normal vedleggsliste__fil_slett"
                                title="Slett vedlegg"
                                onClick={() => removeFile(fil.uuid, props.vedlegg.type)}
                            >
                                Fjern
                                <MargIkon ikon={MargIkoner.SØPPELBØTTE} />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default EttersendelseVedlegg;
