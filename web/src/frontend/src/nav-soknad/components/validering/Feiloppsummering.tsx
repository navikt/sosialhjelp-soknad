import * as React from "react";
import { Undertittel } from "nav-frontend-typografi";
import "./feiloppsummering.css";

export interface FeillisteMelding {
	feltnavn: string;
	feilmelding: string;
}
const FeillisteMelding: React.StatelessComponent<FeillisteMelding> = ({
	feltnavn,
	feilmelding
}) => {
	return (
		<li className="feiloppsummering__feil">
			<a href={`#${feltnavn}`}>{feilmelding}</a>
		</li>
	);
};

interface Props {
	skjemanavn: string;
	sendSkjemaFeiletHandtert: (skjemanavn: string) => void;
	skjemaErGyldig: (skjemanavn: string) => boolean;
	settFokus?: boolean;
	visFeilliste?: boolean;
	feilmeldinger?: FeillisteMelding[];
}

class Feiloppsummering extends React.Component<Props, {}> {
	oppsummering: HTMLDivElement;

	constructor(props: Props) {
		super(props);
		this.getFeilmeldinger = this.getFeilmeldinger.bind(this);
		this.fokuserOppsummering = this.fokuserOppsummering.bind(this);
	}
	componentDidUpdate(prevProps: Props) {
		const { settFokus, skjemaErGyldig, skjemanavn } = this.props;
		if (settFokus) {
			// if (!erSynligIViewport(this.refs.oppsummering)) {
			// 	scrollTo(this.refs.oppsummering, 300);
			// 	setTimeout(() => {
			// 		this.fokuserOppsummering();
			// 	}, 300);
			// } else {
			// 	this.fokuserOppsummering();
			// }
		}
		if (
			this.getFeilmeldinger(this.props).length === 0 &&
			this.getFeilmeldinger(prevProps).length > 0
		) {
			skjemaErGyldig(skjemanavn);
		}
	}

	getFeilmeldinger(props: Props): FeillisteMelding[] {
		return props.feilmeldinger || [];
	}

	fokuserOppsummering() {
		const { sendSkjemaFeiletHandtert, skjemanavn } = this.props;
		this.oppsummering.focus();
		sendSkjemaFeiletHandtert(skjemanavn);
	}

	render() {
		const feilmeldinger = this.getFeilmeldinger(this.props);
		return (
			<div aria-live="polite" role="alert">
				{(() => {
					if (feilmeldinger.length > 0 && this.props.visFeilliste) {
						return (
							<div
								className="panel panel--feiloppsummering"
								ref={c => (this.oppsummering = c)}
								tabIndex={-1}
							>
								<Undertittel className="feiloppsummering__tittel blokk-s">
									Det er {feilmeldinger.length} feil i skjemaet
								</Undertittel>
								<ul className="feiloppsummering__liste">
									{feilmeldinger.map((feilmld, index) => {
										return <FeillisteMelding key={index} {...feilmld} />;
									})}
								</ul>
							</div>
						);
					}
					return null;
				})()}
			</div>
		);
	}
}

export default Feiloppsummering;
