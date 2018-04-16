import * as React from "react";
import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";
import {
	lastOppEttersendelseVedlegg,
	slettEttersendtVedlegg
} from "../../../nav-soknad/redux/ettersendelse/ettersendelseActions";
import { DispatchProps } from "../../../nav-soknad/redux/reduxTypes";
import { connect } from "react-redux";
import { State } from "../../redux/reducers";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import { downloadAttachedFile } from "../../../nav-soknad/utils/rest-utils";

interface OwnProps {
	children: React.ReactNode;
	vedlegg?: any;
}

export type Props = OwnProps & DispatchProps;

class EttersendelseVedlegg extends React.Component<Props, {}> {

	leggTilVedleggKnapp: HTMLInputElement;

	constructor(props: Props) {
		super(props);
		this.handleFileUpload = this.handleFileUpload.bind(this);
	}

	removeFile(filId: string, vedleggId: string) {
		this.props.dispatch(slettEttersendtVedlegg(vedleggId, filId));
	}

	handleFileUpload(files: FileList) {
		if (files.length !== 1) {
			return;
		}
		const formData = new FormData();
		formData.append("file", files[ 0 ], files[ 0 ].name);
		const vedleggId = this.props.vedlegg.vedleggId;
		this.props.dispatch(lastOppEttersendelseVedlegg(vedleggId, formData));
	}

	render() {
		return (
			<span>
				<div className="avsnitt_med_marger">
					<div className="venstremarg"/>
					<div className="avsnitt">
						{this.props.children}
					</div>
					<div
						className="hoyremarg hoyremarg__ikon hoyremarg__ikon__hover"
						onClick={() => {
							this.leggTilVedleggKnapp.click();
						}}
					>
						<DigisosIkon navn="lastOpp" className="ettersendelse__ikon"/>
					</div>
					<input
						ref={c => this.leggTilVedleggKnapp = c}
						onChange={(e) => this.handleFileUpload(e.target.files)}
						type="file"
						className="visuallyhidden"
						tabIndex={-1}
						accept="image/jpeg,image/png,application/pdf"
					/>
				</div>
				{this.props.vedlegg && this.props.vedlegg.filer.map((fil: any) => {
						const vedleggId = this.props.vedlegg.vedleggId;
						const lastNedUrl = `sendsoknad/ettersendelsevedlegg/vedlegg/${vedleggId}?filId=${fil.id}`;
						return (
							<div className="avsnitt_med_marger" key={fil.id}>
								<div className="venstremarg"/>
								<div className="avsnitt">
									<Lenkeknapp onClick={() => downloadAttachedFile(lastNedUrl)}>
										{fil.filnavn}
									</Lenkeknapp>
								</div>
								<div className="hoyremarg">
									<div
										className="hoyremarg__ikon hoyremarg__ikon__hover"
										onClick={() => {
											this.removeFile(fil.id, this.props.vedlegg.vedleggId);
										}}
									>
										<DigisosIkon navn="trashcan" className="ettersendelse__ikon trashcan"/>
									</div>
								</div>
							</div>
						);
					}
				)}

			</span>
		);
	}
}

export default connect<{}, {}, Props>((state: State) => ({}))(EttersendelseVedlegg);
