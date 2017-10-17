import * as React from "react";
import { Panel } from "nav-frontend-paneler";
import Icon from "nav-frontend-ikoner-assets";
import { Innholdstittel } from "nav-frontend-typografi";

interface Props {
	tittel?: string;
	className?: string;
}

const Infoblokk: React.StatelessComponent<Props> = ({ className, children, tittel }) => {
	return (
		<Panel className={`skjema-infoblokk ${className}`}>
			<div className="skjema-infoblokk__content">
				<div className="skjema-infoblokk__icon">
					<Icon kind="info-sirkel" />
				</div>
				{tittel &&
					<div>
						<Innholdstittel className="skjema-infoblokk__title">{tittel}</Innholdstittel>
						<div className="skjema-infoblokk__dash"/>
					</div>
				}
				{children}
			</div>
		</Panel>
	);
};

export default Infoblokk;
