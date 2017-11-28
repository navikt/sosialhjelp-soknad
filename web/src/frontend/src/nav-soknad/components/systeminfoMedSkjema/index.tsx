import * as React from "react";
import { findDOMNode } from "react-dom";
import Lenkeknapp from "../lenkeknapp/Lenkeknapp";
import Underskjema from "../underskjema";
import { focusOnFirstElement } from "../../utils/domUtils";

interface Props {
	/** Kalles når bruker velger å vise skjema */
	onVisSkjema: () => void;
	/** Kalles når bruker velger å avbryte endring */
	onSkjulSkjema: () => void;
	/** Skjema som viser når bruker ønsker å endre verdier */
	skjema?: React.ReactNode;
	/** Informasjonen som er hentet opp fra system */
	children?: React.ReactNode;
	/** Label - endre knapp */
	endreLabel?: string;
	/** Label - avbryt endring knapp */
	avbrytLabel?: string;
	/** Om skjema skal vises eller ikke */
	skjemaErSynlig: boolean;
}

class SysteminfoMedSkjema extends React.Component<Props> {
	skjema: HTMLElement;
	visSkjemaKnapp: Lenkeknapp;
	focusFunc: () => void;

	componentWillReceiveProps(nextProps: Props) {
		if (!this.props.skjemaErSynlig && nextProps.skjemaErSynlig) {
			this.focusFunc = () => {
				focusOnFirstElement(this.skjema);
			};
		} else if (this.props.skjemaErSynlig && !nextProps.skjemaErSynlig) {
			this.focusFunc = () => {
				(findDOMNode(this.visSkjemaKnapp) as HTMLElement).focus();
			};
		}
	}

	componentDidUpdate() {
		if (this.focusFunc) {
			this.focusFunc();
			this.focusFunc = null;
		}
	}

	render() {
		const {
			children,
			skjema,
			endreLabel,
			avbrytLabel,
			skjemaErSynlig
		} = this.props;
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
								ref={c => (this.visSkjemaKnapp = c)}
								onClick={this.props.onVisSkjema}
							>
								{endreLabel}
							</Lenkeknapp>
						)}
						{skjemaErSynlig && (
							<div>
								<div
									className="systeminfo_endreSkjema"
									ref={c => (this.skjema = c)}
								>
									{skjema}
								</div>
								<div className="blokk-xxs">
									<Lenkeknapp onClick={this.props.onSkjulSkjema}>
										{avbrytLabel}
									</Lenkeknapp>
								</div>
							</div>
						)}
					</div>
				)}
			</Underskjema>
		);
	}
}

export default SysteminfoMedSkjema;
