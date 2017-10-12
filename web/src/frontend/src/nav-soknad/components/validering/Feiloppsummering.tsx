import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Undertittel } from "nav-frontend-typografi";
import { Valideringsfeil } from "../../validering/types";
import { scrollToElement } from "../../utils";
import { getFaktumElementName } from "../../faktum/FaktumComponent";

const getElementFromFaktumKey = (
	faktumKey: string,
	property?: string,
	faktumId?: number
): HTMLElement => {
	const id = getFaktumElementName(faktumKey, property, faktumId);
	if (document.getElementById(id)) {
		return document.getElementById(id);
	}
	const namedElements = document.getElementsByName(id);
	if (namedElements && namedElements.length > 0) {
		return namedElements[0];
	}
	return null;
};

const scrollToFaktum = (
	evt: React.MouseEvent<any>,
	faktumKey: string,
	property?: string,
	faktumId?: number
) => {
	evt.stopPropagation();
	evt.preventDefault();
	const element = getElementFromFaktumKey(faktumKey, property, faktumId);
	if (element) {
		scrollToElement(element.id);
		element.focus();
	}
};

const FeillisteMelding: React.StatelessComponent<Valideringsfeil> = ({
	faktumKey,
	property,
	faktumId,
	feilkode
}) => {
	return (
		<li className="feiloppsummering__feil">
			<a
				href={`#`}
				onClick={evt => scrollToFaktum(evt, faktumKey, property, faktumId)}
			>
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

const COMP_ID = "skjema-feiloppsummering";

class Feiloppsummering extends React.Component<Props, {}> {
	oppsummering: HTMLDivElement;

	componentDidUpdate(prevProps: Props) {
		if (
			this.props.visFeilliste &&
			this.props.valideringsfeil.length > 0 &&
			this.props.stegValidertCounter > prevProps.stegValidertCounter
		) {
			scrollToElement(COMP_ID);
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
								id={COMP_ID}
								className="panel panel--feiloppsummering"
								tabIndex={-1}
								ref={c => (this.oppsummering = c)}
							>
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
