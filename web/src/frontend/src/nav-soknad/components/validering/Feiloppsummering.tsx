import * as React from "react";
import { Undertittel } from "nav-frontend-typografi";
import "./feiloppsummering.css";
import { Valideringsfeil } from "../../redux/faktaTypes";

const scrollToElement = (element: HTMLElement) => {
	if (element && element.scrollIntoView) {
		element.focus();
	}
};

const FeillisteMelding: React.StatelessComponent<Valideringsfeil> = ({
	element,
	faktumKey,
	feil
}) => {
	return (
		<li className="feiloppsummering__feil">
			<a href={`#${element}`} onClick={() => scrollToElement(element)}>
				{feil.feilmelding}
			</a>
		</li>
	);
};

interface Props {
	skjemanavn: string;
	settFokus?: boolean;
	visFeilliste?: boolean;
	feilmeldinger?: Valideringsfeil[];
}

class Feiloppsummering extends React.Component<Props, {}> {
	oppsummering: HTMLDivElement;

	constructor(props: Props) {
		super(props);
		this.getFeilmeldinger = this.getFeilmeldinger.bind(this);
	}

	getFeilmeldinger(props: Props): Valideringsfeil[] {
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
								tabIndex={-1}>
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
