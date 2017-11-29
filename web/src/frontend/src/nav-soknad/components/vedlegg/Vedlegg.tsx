import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Knapp } from "nav-frontend-knapper";
import { connect } from "react-redux";
import { hentVedleggsForventning, lastOppVedlegg } from "../../redux/vedlegg/vedleggActions";
import { SoknadAppState } from "../../redux/reduxTypes";
import VedleggsListe from "./VedleggsListe";
// import { finnFaktum } from "../../utils/faktumUtils";
import { Faktum } from "../../types/navSoknadTypes";
import { Fil } from "../../redux/vedlegg/vedleggTypes";

interface Props {
	faktumKey: string;
	label: string;
}

interface ConnectedProps {
	vedlegg?: any;
	fakta?: Faktum[];
	lastOppVedlegg?: (faktumKey: string, vedleggId: number, formData: FormData, filer: Fil[]) => void;
	hentVedleggsForventning?: (fakta: Faktum[]) => void;
	filer?: any[];
}

type AllProps = Props & ConnectedProps;

class Vedlegg extends React.Component<AllProps, {}> {

	refs: {
		leggTilVedleggKnapp: HTMLInputElement;
	};

	// hentVedleggsId(faktumKey: string): number {
	// 	const { fakta, vedlegg } = this.props;
	// 	const faktum = finnFaktum(faktumKey, fakta, null);
	// 	if (faktum && faktum.faktumId && vedlegg && vedlegg.map) {
	// 		for (const vedleggsForventning of vedlegg) {
	// 			if (vedleggsForventning.faktumId.toString() === faktum.faktumId.toString()) {
	// 				return vedleggsForventning.vedleggId;
	// 			}
	// 		}
	// 	}
	// 	return -1;
	// }

	handleFileUpload(files: FileList) {
		const formData = new FormData();
		const filer: Fil[] = [];
		for (let i = 0; i < files.length; i++) {
			formData.append("file" + i, files[i], files[i].name);
			filer.push({navn: files[i].name, status: ""});
		}
		// const vedleggId = this.hentVedleggsId(this.props.faktumKey);
		const vedleggId = this.lesVedleggId();
		console.warn("last opp vedleggId: " + vedleggId);
		this.props.lastOppVedlegg(this.props.faktumKey, vedleggId, formData, filer);
	}

	componentDidMount() {
		this.props.hentVedleggsForventning(this.props.fakta);
	}

	componentDidUpdate() {
		let filer: Fil[] = [];
		if (this.props.vedlegg.vedlegg && this.props.vedlegg.vedlegg[ this.props.faktumKey ]) {
			filer = this.props.vedlegg.vedlegg[ this.props.faktumKey ].filer;
		}
		console.warn("update: " + JSON.stringify(filer, null, 4));
	}

	render() {
		const vedleggId = this.lesVedleggId();
		const vedleggForventet: boolean = (Number(vedleggId) > 0);
		const filer = this.lesFilListe();

		if (!vedleggForventet) {
			return null;
		} else {
			return (
				<div className="container--noPadding">
					<p>
						{this.props.label}
					</p>
					<VedleggsListe
						filer={filer}
						faktumKey={this.props.faktumKey}
					/>
					<Knapp
						type="standard"
						htmlType="submit"
						spinner={false}
						disabled={false}
						onClick={() => {
							this.refs.leggTilVedleggKnapp.click();
						}}
					>
						+ <FormattedMessage id="opplysninger.vedlegg.knapp.tekst"/>
					</Knapp>
					<input
						ref="leggTilVedleggKnapp"
						onChange={(e) => this.handleFileUpload(e.target.files)}
						type="file"
						className="visuallyhidden"
						accept="image/jpeg,image/png,application/pdf"
						multiple={true}
					/>
				</div>
			);
		}
	}

	private lesFilListe() {
		let filer: Fil[] = [];
		if (this.props.vedlegg.vedlegg && this.props.vedlegg.vedlegg[ this.props.faktumKey ]) {
			filer = this.props.vedlegg.vedlegg[ this.props.faktumKey ].filer;
		}
		return filer;
	}

	private lesVedleggId() {
		let vedleggId = -1;
		if (this.props.vedlegg.vedlegg && this.props.vedlegg.vedlegg[ this.props.faktumKey ]) {
			vedleggId = this.props.vedlegg.vedlegg[ this.props.faktumKey ].vedleggId;
		}
		return vedleggId;
	}
}

const mapStateToProps = (state: SoknadAppState) => ({
	fakta: state.fakta.data,
	vedlegg: state.vedlegg.data
});

const mapDispatchToProps = (dispatch: any) => ({
	lastOppVedlegg: (key: string, vedleggId: string, formData: any, filer: Fil[]) =>
		dispatch(lastOppVedlegg(key, vedleggId, formData, filer)),
	hentVedleggsForventning: (fakta: Faktum[]) => dispatch(hentVedleggsForventning(fakta))
});

export default connect<{}, {}, Props>(
	mapStateToProps,
	mapDispatchToProps
)(Vedlegg);
