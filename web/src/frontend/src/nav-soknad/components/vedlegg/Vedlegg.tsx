import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Knapp } from "nav-frontend-knapper";
import { FeatureToggles } from "../../../featureToggles";
import { connect } from "react-redux";
import { hentVedleggsForventning, lastOppVedlegg } from "../../redux/vedlegg/vedleggActions";
import { SoknadAppState } from "../../redux/reduxTypes";
import VedleggsListe from "./VedleggsListe";
import { finnFaktum } from "../../utils/faktumUtils";

interface Props {
	label: string;
	faktumKey: string;
	vedlegg?: any;
	featureToggleBeOmLonnslippVedlegg?: boolean;
	fakta?: any;
	lastOppVedlegg?: any;
	hentVedleggsForventning?: any;
	filer?: any[];
}

interface State {
	vedleggId: number;
}

class Vedlegg extends React.Component<Props, State> {

	refs: {
		leggTilVedleggKnapp: HTMLInputElement;
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			vedleggId: null
		};
	}

	hentVedleggsId(faktumKey: string): number {
		const { fakta, vedlegg } = this.props;
		const faktum = finnFaktum(faktumKey, fakta, null);

		if (faktum && faktum.faktumId && vedlegg && vedlegg.map) {
			for (const vedleggsForventning of vedlegg) {
				if (vedleggsForventning.faktumId.toString() === faktum.faktumId.toString()) {
					return vedleggsForventning.vedleggId;
				}
			}
		}
		return -1;
	}

	handleFileUpload(files: FileList) {
		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append("file" + i, files[i], files[i].name);
		}
		this.props.lastOppVedlegg(this.state.vedleggId, formData);
	}

	componentDidUpdate() {
		if (this.props.featureToggleBeOmLonnslippVedlegg) {
			if (this.state.vedleggId === null ) {
				const vedleggId = this.hentVedleggsId(this.props.faktumKey);
				if (vedleggId > 0) {
					this.setState({vedleggId});
				}
			}
		}
	}

	componentDidMount() {
		if (this.props.featureToggleBeOmLonnslippVedlegg) {
			this.props.hentVedleggsForventning();
		}
	}

	render() {
		const vedleggForventet: boolean = (Number(this.state.vedleggId) > 0);
		if (!vedleggForventet) {
			return null;
		} else {
			return (
				<div className="container--noPadding">
					<p>
						{this.props.label}
					</p>
					<VedleggsListe vedlegg={this.props.filer}
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

}

const mapStateToProps = (state: SoknadAppState) => ({
	fakta: state.fakta.data,
	vedlegg: state.vedlegg.data,
	filer: state.vedlegg.filer,
	featureToggleBeOmLonnslippVedlegg: state.miljovariabler.data[FeatureToggles.beOmLonnslippVedlegg]
});

const mapDispatchToProps = (dispatch: any) => ({
	lastOppVedlegg: (vedleggId: string, formData: any) => dispatch(lastOppVedlegg(vedleggId, formData)),
	hentVedleggsForventning: () => dispatch(hentVedleggsForventning())
});

export default connect<{}, {}, Props>(
	mapStateToProps,
	mapDispatchToProps
)(Vedlegg);
