import * as React from "react";
import { InjectedIntlProps, FormattedMessage, injectIntl } from "react-intl";
import { Knapp } from "nav-frontend-knapper";
import Lenkeknapp from "../lenkeknapp/Lenkeknapp";

interface Vedlegg {
	name: string;
}
interface OwnProps {
	faktumId: string;
	label: string;
	vedlegg?: Vedlegg[];
}

interface State {
	files: object[];
}

type Props = OwnProps & InjectedIntlProps;

class Vedlegg extends React.Component<Props, State> {

	refs: {
		leggTilVedleggKnapp: any;
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			files: []
		};
	}

	handleFileUpload(event: any) {
		const files = Array.from(event.target.files).map((file: File) => {
			return { name: file.name };
		});
		this.setState({
			files
		});
		event.preventDefault();
	}

	render() {
		return (
			<div className="container--noPadding">
				<p>
					{this.props.label}
				</p>
				<Knapp
					type="standard"
					htmlType="submit"
					spinner={false}
					disabled={false}
					onClick={() => {
						this.refs.leggTilVedleggKnapp.click();
					}}
				>+ <FormattedMessage id="opplysninger.vedlegg.knapp.tekst"/></Knapp>

				<input
					ref="leggTilVedleggKnapp"
					onChange={(e) => this.handleFileUpload(e)}
					type="file"
					className="visuallyhidden"
					accept="image/jpeg,image/png,application/pdf"
					multiple={true}
				/>
				<div>
					{this.state.files.map((file: any, index: number) => {
						return (
							<div key={index}>
								<Lenkeknapp
									onClick={ () => { alert("todo"); }}
									label={file.name}
								/>
							</div>

						);
					})
					}
				</div>
			</div>
		);
	}
}

export default (injectIntl(Vedlegg));
