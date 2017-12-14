// import * as React from "react";
// import { FormattedMessage } from "react-intl";
// import { Knapp } from "nav-frontend-knapper";
// import { connect } from "react-redux";
// import { lastOppVedlegg, slettFil } from "../../redux/vedlegg/vedleggActions";
// import { SoknadAppState } from "../../redux/reduxTypes";
// import VedleggsListe from "./VedleggsListe";
// import { Faktum } from "../../types/navSoknadTypes";
// import { Fil, Vedlegg as VedleggType } from "../../redux/vedlegg/vedleggTypes";
// import { downloadAttachedFile } from "../../utils/rest-utils";
//
// interface Props {
// 	faktumKey: string;
// 	label: string;
// }
//
// interface ConnectedProps {
// 	vedlegg?: VedleggType;
// 	fakta?: Faktum[];
// 	brukerBehandlingId: string;
// 	lastOppVedlegg?: (faktumKey: string, vedleggId: number, formData: FormData, filer: Fil[]) => void;
// 	slettFil?: (faktumKey: string, vedleggId: string, filNavn: string) => void;
// 	hentFilListe: (key: string, vedleggId: string) => any;
// }
//
// type AllProps = Props & ConnectedProps;
//
// class Vedlegg extends React.Component<AllProps, {}> {
//
// 	leggTilVedleggKnapp: HTMLInputElement;
//
// 	handleFileUpload(files: FileList) {
// 		const formData = new FormData();
// 		const filer: Fil[] = [];
// 		for (let i = 0; i < files.length; i++) {
// 			formData.append("file" + i, files[i], files[i].name);
// 			filer.push({navn: files[i].name, status: ""});
// 		}
// 		const vedleggId = this.lesVedleggId();
// 		this.props.lastOppVedlegg(this.props.faktumKey, vedleggId, formData, filer);
// 	}
//
// 	slettFil(faktumKey: string, filNavn: string) {
// 		const vedleggId = this.lesVedleggId();
// 		this.props.slettFil(faktumKey, vedleggId.toString(10), filNavn);
// 	}
//
// 	lastNedVedlegg(filNavn: string) {
// 		const urlPath = `vedlegg/${this.lesVedleggId()}/${filNavn}?behandlingsId=${this.props.brukerBehandlingId}`;
// 		downloadAttachedFile(urlPath);
// 	}
//
// 	render() {
// 		const vedleggId = this.lesVedleggId();
// 		const vedleggForventet: boolean = (Number(vedleggId) > 0);
// 		const filer = this.lesFilListe();
//
// 		if (!vedleggForventet) {
// 			return null;
// 		} else {
// 			return (
// 				<div className="container--noPadding">
// 					<p>
// 						{this.props.label}
// 					</p>
// 					<VedleggsListe
// 						filer={filer}
// 						faktumKey={this.props.faktumKey}
// 						slettFil={(faktumKey: string, filNavn: string) => this.slettFil(faktumKey, filNavn)}
// 						lastNedVedlegg={(filNavn: string) => this.lastNedVedlegg(filNavn)}
// 					/>
// 					<Knapp
// 						type="standard"
// 						htmlType="submit"
// 						disabled={false}
// 						onClick={() => {
// 							this.leggTilVedleggKnapp.click();
// 						}}
// 					>
// 						+ <FormattedMessage id="opplysninger.vedlegg.knapp.tekst"/>
// 					</Knapp>
// 					<input
// 						ref={ c => this.leggTilVedleggKnapp = c}
// 						onChange={(e) => this.handleFileUpload(e.target.files)}
// 						type="file"
// 						className="visuallyhidden"
// 						accept="image/jpeg,image/png,application/pdf"
// 						multiple={true}
// 					/>
// 				</div>
// 			);
// 		}
// 	}
//
// 	private lesFilListe(): Fil[] {
// 		let filer: Fil[] = [];
// 		if (this.props.vedlegg.vedlegg && this.props.vedlegg.vedlegg[ this.props.faktumKey ]) {
// 			filer = this.props.vedlegg.vedlegg[ this.props.faktumKey ].filer;
// 		}
// 		return filer;
// 	}
//
// 	private lesVedleggId() {
// 		let vedleggId = -1;
// 		if (this.props.vedlegg.vedlegg && this.props.vedlegg.vedlegg[ this.props.faktumKey ]) {
// 			vedleggId = this.props.vedlegg.vedlegg[ this.props.faktumKey ].vedleggId;
// 		}
// 		return vedleggId;
// 	}
// }
//
// const mapStateToProps = (state: SoknadAppState) => ({
// 	fakta: state.fakta.data,
// 	vedlegg: state.vedlegg.data,
// 	brukerBehandlingId: state.soknad.data.brukerBehandlingId
// });
//
// const mapDispatchToProps = (dispatch: any) => ({
// 	lastOppVedlegg: (key: string, vedleggId: string, formData: any, filer: Fil[]) =>
// 		dispatch(lastOppVedlegg(key, vedleggId, formData, filer)),
// 	slettFil: (faktumKey: string, vedleggId: string, filNavn: string): void =>
// 		dispatch(slettFil(faktumKey, vedleggId, filNavn))
// });
//
// export default connect<{}, {}, Props>(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(Vedlegg);
