import * as React from "react";
import { findDOMNode } from "react-dom";
import Lenkeknapp from "../lenkeknapp/Lenkeknapp";
import Underskjema from "../underskjema";
import { focusOnFirstElement } from "../../utils/domUtils";

interface Props {
	/** Kalles når bruker velger å vise skjema */
	onVisSkjema?: () => void;
	/** Kalles når bruker velger å avbryte endring */
	onSkjulSkjema?: () => void;
	/** Skjema som viser når bruker ønsker å endre verdier */
	skjema?: React.ReactNode;
	/** Informasjonen som er hentet opp fra system */
	children?: React.ReactNode;
	/** Label - endre knapp */
	endreLabel?: string;
	/** Label - avbryt endring knapp */
	avbrytLabel?: string;
	/** Om skjema skal vises eller ikke */
	skjemaErSynlig?: boolean;
}

class SysteminfoMedSkjema extends React.Component<Props> {
	skjema: HTMLElement;
	visSkjemaKnapp: Lenkeknapp;
	focusFunc: () => void;

	constructor(props: Props) {
		super(props);
		this.renderSkjema = this.renderSkjema.bind(this);
	}

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

	labelToId(str: string) {
		return str.replace(/\s+/g, "_").toLowerCase() + "_lenke";
	}

	renderSkjema() {
		const { skjema, endreLabel, avbrytLabel, skjemaErSynlig } = this.props;
		if (!skjema) {
			return null;
		}
		return (
			<div className="systeminfoMedSkjema__skjemaWrapper">
				{skjemaErSynlig ? (
					<div
						className="systeminfoMedSkjema__skjema"
						ref={c => (this.skjema = c)}
					>
						{skjema}
					</div>
				) : null}
				{!skjemaErSynlig && (
					<Lenkeknapp
						ref={c => (this.visSkjemaKnapp = c)}
						onClick={this.props.onVisSkjema}
						id={this.labelToId(this.props.endreLabel) + "_lenke"}
					>
						{endreLabel}
					</Lenkeknapp>
				)}
				{skjemaErSynlig && (
					<div className="systeminfoMedSkjema__skjulSkjemaKnapp">
						<Lenkeknapp
							onClick={this.props.onSkjulSkjema}
							id={this.labelToId(this.props.avbrytLabel) + "_lenke"}
						>
							{avbrytLabel}
						</Lenkeknapp>
					</div>
				)}
			</div>
		);
	}

	render() {
		const { children } = this.props;

		return (
			<div className="systeminfoMedSkjema">
				<Underskjema
					arrow={false}
					visible={true}
					collapsable={false}
					style="system"
				>
					<div className="systeminfoMedSkjema__info">{children}</div>
					{this.renderSkjema()}
				</Underskjema>
			</div>
		);
	}
}

export default SysteminfoMedSkjema;
