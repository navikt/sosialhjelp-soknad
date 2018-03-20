import * as React from "react";
import DigisosIkon from "../../../nav-soknad/components/digisosIkon/digisosIkon";

interface Props {
	children: React.ReactNode;
}

interface State {
	filenames: string[];
}
class EttersendelseVedlegg extends React.Component<Props, State> {

	leggTilVedleggKnapp: HTMLInputElement;

	constructor(props: Props) {
		super(props);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.state = {
			filenames: []
		};
	}

	removeFile(filename: string) {
		const filenames = this.state.filenames;
		this.setState({filenames: filenames.filter((item) => item !== filename)});
	}

	handleFileUpload(files: FileList) {
		if (files.length !== 1) {
			return;
		}
		const formData = new FormData();
		formData.append("file", files[0], files[0].name);
		/// this.props.dispatch...
		const filenames = this.state.filenames;
		filenames.push(files[0].name);
		this.setState({filenames});
		this.leggTilVedleggKnapp.value = null;
	}

	render() {
		return (
			<span>
				<div className="avsnitt_med_marger">
					<div className="venstemarg"/>
					<div className="avsnitt">
						{this.props.children}
					</div>
					<div
						className="hoyremarg hoyremarg__ikon"
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
				{this.state.filenames.map((filename) => {
					return (
						<div className="avsnitt_med_marger" key={filename}>
							<div className="venstemarg"/>
							<div className="avsnitt">
								<div key={filename}>
									<a className="lenke" href="todo">{filename}</a>
								</div>
							</div>
							<div
								className="hoyremarg hoyremarg__ikon"
								onClick={() => {
									this.removeFile(filename);
								}}
							>
								<DigisosIkon navn="trashcan" className="ettersendelse__ikon trashcan"/>
							</div>
						</div>
					);
					}
				)}

			</span>
		);
	}
}

export default EttersendelseVedlegg;
