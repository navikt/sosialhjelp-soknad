import * as React from "react";
import { Undertittel } from "nav-frontend-typografi";
import "./feiloppsummering.css";
import { Valideringsfeil } from "../../validering/types";
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

interface Props {
	skjemanavn: string;
	visFeilliste?: boolean;
	stegValidertCounter?: number;
	valideringsfeil?: Valideringsfeil[];
}

class Feiloppsummering extends React.Component<Props, {}> {
	oppsummering: HTMLDivElement;

	componentDidUpdate(prevProps: Props) {
		if (
			this.props.visFeilliste &&
			this.props.valideringsfeil.length > 0 &&
			this.props.stegValidertCounter > prevProps.stegValidertCounter
		) {
			this.oppsummering.focus();
		}
	}

	render() {
		const { valideringsfeil } = this.props;
		return (
			<div aria-live="polite" role="alert">
				{(() => {
					if (valideringsfeil.length > 0 && this.props.visFeilliste) {
						return (
							<div
								className="panel panel--feiloppsummering"
								tabIndex={-1}
								ref={c => (this.oppsummering = c)}>
								<Undertittel className="feiloppsummering__tittel blokk-s">
									Det er {valideringsfeil.length} feil i skjemaet
								</Undertittel>
								<ul className="feiloppsummering__liste">
									{valideringsfeil.map((feilmld, index) => {
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
