import * as React from "react";
import { Undertittel } from "nav-frontend-typografi";
import "./feiloppsummering.css";
import { Valideringsfeil } from "../../validering/types";
import { filtrerFeilmeldinger } from "./feilUtils";
import { FormattedMessage } from "react-intl";

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
	feilkode
}) => {
	return (
		<li className="feiloppsummering__feil">
			<a href={`#`} onClick={evt => scrollToElement(evt, faktumKey)}>
				<FormattedMessage id={feilkode} />
			</a>
		</li>
	);
};

class Feilliste extends React.Component<
	{ feilmeldinger: Valideringsfeil[] },
	{}
> {
	element: HTMLDivElement;
	componentDidMount() {
		this.element.focus();
	}
	render() {
		const { feilmeldinger } = this.props;
		return (
			<div
				className="panel panel--feiloppsummering"
				tabIndex={-1}
				ref={c => (this.element = c)}>
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
}

interface Props {
	skjemanavn: string;
	settFokus?: boolean;
	visFeilliste?: boolean;
	feilmeldinger?: Valideringsfeil[];
}

class Feiloppsummering extends React.Component<Props, {}> {
	oppsummering: HTMLDivElement;

	render() {
		const feilmeldinger = filtrerFeilmeldinger(this.props.feilmeldinger);
		return (
			<div aria-live="polite" role="alert">
				{(() => {
					if (feilmeldinger.length > 0 && this.props.visFeilliste) {
						return <Feilliste feilmeldinger={feilmeldinger} />;
					}
					return null;
				})()}
			</div>
		);
	}
}

export default Feiloppsummering;
