import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import Lenkeknapp from "../components/lenkeknapp/Lenkeknapp";
import Underskjema from "../components/underskjema";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";

interface OwnProps {
	skjema?: React.ReactNode;
	children?: React.ReactNode;
	endreLabel?: string;
	avbrytLabel?: string;
}

class SysteminfoFaktum extends React.Component<
	OwnProps & InjectedFaktumComponentProps & InjectedIntlProps,
	{}
> {
	render() {
		const { intl, children, endreLabel, avbrytLabel, skjema } = this.props;
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
							<Lenkeknapp
								label={
									endreLabel ||
									intl.formatMessage({ id: "systeminfo.endreknapp.label" })
								}
								onClick={() =>
									this.props.setFaktumVerdi("true", this.props.property)
								}
							/>
						)}
						{skjemaErSynlig && (
							<div>
								<div className="systeminfo_endreSkjema">{skjema}</div>
								<div className="blokk-xxs">
									<Lenkeknapp
										label={
											avbrytLabel ||
											intl.formatMessage({
												id: "systeminfo.avbrytendringknapp.label"
											})
										}
										onClick={() =>
											this.props.setFaktumVerdi("", this.props.property)
										}
									/>
								</div>
							</div>
						)}
					</div>
				)}
			</Underskjema>
		);
	}
}

export default injectIntl(
	faktumComponent({ property: "brukerendret" })(SysteminfoFaktum)
);
