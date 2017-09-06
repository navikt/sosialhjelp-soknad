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
	settFokus?: boolean;
	visFeilliste?: boolean;
	feilmeldinger?: FeillisteMelding[];
}

class Feiloppsummering extends React.Component<Props, {}> {
	oppsummering: HTMLDivElement;

	constructor(props: Props) {
		super(props);
		this.getFeilmeldinger = this.getFeilmeldinger.bind(this);
	}

	getFeilmeldinger(props: Props): FeillisteMelding[] {
		return props.feilmeldinger || [];
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
