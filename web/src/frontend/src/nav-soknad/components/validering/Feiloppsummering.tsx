import * as React from "react";
import { Undertittel } from "nav-frontend-typografi";
import "./feiloppsummering.css";
import { Valideringsfeil } from "../../validering/types";

const getElementFromFaktumKey = (faktumKey: string): HTMLElement => {
	if (document.getElementById(faktumKey)) {
		return document.getElementById(faktumKey);
	}
	const namedElements = document.getElementsByName(faktumKey);
	if (namedElements && namedElements.length > 0) {
		return namedElements[0];
	}
	return null;
};

const scrollToElement = (evt: React.MouseEvent<any>, faktumKey: string) => {
	evt.stopPropagation();
	evt.preventDefault();
	const element = getElementFromFaktumKey(faktumKey);
	if (element) {
		element.focus();
	}
};

const FeillisteMelding: React.StatelessComponent<Valideringsfeil> = ({
	faktumKey,
	feil
}) => {
	return (
		<li className="feiloppsummering__feil">
			<a href={`#`} onClick={evt => scrollToElement(evt, faktumKey)}>
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
