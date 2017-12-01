import * as React from "react";
import { Panel } from "nav-frontend-paneler";
import Icon from "nav-frontend-ikoner-assets";
import { Innholdstittel, Systemtittel } from "nav-frontend-typografi";

interface Props {
	tittel?: string;
	brukSystemtittel?: boolean;
	className?: string;
}

const Infoblokk: React.StatelessComponent<Props> = ({
	className,
	children,
	tittel,
	brukSystemtittel
}) => {
	return (
		<Panel className={`skjema-infoblokk ${className}`}>
			<div className="skjema-infoblokk__content">
				<div className="skjema-infoblokk__icon">
					<Icon kind="info-sirkel-fylt" className="digisos-infosirkel-gul" />
				</div>
				{tittel && (
					<div>
						{brukSystemtittel ? (
							<Systemtittel className="skjema-infoblokk__title">
								{tittel}
							</Systemtittel>
						) : (
							<Innholdstittel className="skjema-infoblokk__title">
								{tittel}
							</Innholdstittel>
						)}
						<div className="skjema-infoblokk__dash" />
					</div>
				)}
				<div className="skjema-infoblokk__tekst">{children}</div>
			</div>
		</Panel>
	);
};

export default Infoblokk;
