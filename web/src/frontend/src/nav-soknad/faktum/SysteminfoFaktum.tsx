import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import Lenkeknapp from "../components/lenkeknapp/Lenkeknapp";
import Underskjema from "../components/underskjema";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";

interface OwnProps {
	children: React.ReactNode;
	skjema?: React.ReactNode;
	endreLabel?: string;
	avbrytLabel?: string;
}

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class SysteminfoFaktum extends React.Component<
	OwnProps & InjectedFaktumComponentProps & InjectedIntlProps,
	{}
> {
	constructor(props: Props) {
		super(props);
		this.toggle = this.toggle.bind(this);
	}
	toggle() {
		const verdi = this.props.getPropertyVerdi();
		this.props.setFaktumVerdi(
			verdi === "true" ? "" : "true",
			this.props.property
		);
	}
	render() {
		const {
			children,
			endreLabel = "Endre",
			avbrytLabel = "Angre endringer",
			skjema
		} = this.props;

		const skjemaErSynlig = this.props.getPropertyVerdi() === "true";

		return (
			<Underskjema
				arrow={false}
				visible={true}
				collapsable={false}
				style="system"
			>
				<div className="blokk-xxs">{children}</div>

				{skjema && (
					<div className="blokk-xxs">
						{!skjemaErSynlig && (
							<Lenkeknapp label={endreLabel} onClick={this.toggle} />
						)}
						{skjemaErSynlig && (
							<div>
								<div className="systeminfo_endreSkjema">{skjema}</div>
								<div className="blokk-xxs">
									<Lenkeknapp label={avbrytLabel} onClick={this.toggle} />
								</div>
							</div>
						)}
					</div>
				)}
			</Underskjema>
		);
	}
}

export default injectIntl(faktumComponent()(SysteminfoFaktum));
