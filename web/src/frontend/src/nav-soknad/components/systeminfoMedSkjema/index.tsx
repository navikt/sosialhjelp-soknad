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

	/* Disable "auto focus" */
	focus?: boolean;
}

class SysteminfoMedSkjema extends React.Component<Props> {
	skjema!: HTMLElement;
	visSkjemaKnapp!: Lenkeknapp;
	focusFunc!: () => void;

	constructor(props: Props) {
		super(props);
		this.renderSkjema = this.renderSkjema.bind(this);
	}

	componentWillReceiveProps(nextProps: Props) {
		if (!this.props.skjemaErSynlig && nextProps.skjemaErSynlig) {
			if (this.props.focus !== false) {
				this.focusFunc = () => {
					focusOnFirstElement(this.skjema);
				};
			}

		} else if (this.props.skjemaErSynlig && !nextProps.skjemaErSynlig) {
			if (this.props.focus !== false) {
				this.focusFunc = () => {
					(findDOMNode(this.visSkjemaKnapp) as HTMLElement).focus();
				};
			}
		}
	}

	componentDidUpdate() {
		if (this.focusFunc) {
			this.focusFunc();
			// @ts-ignore
			this.focusFunc = null;
		}
	}

	labelToId(str: string) {
		return str.replace(/\s+/g, "_").toLowerCase();
	}

	handleVoid(){
		console.warn("onClick");
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
						ref={c => { if (c){this.skjema = c}}}
					>
						{skjema}
					</div>
				) : null}
				{!skjemaErSynlig && endreLabel && (
					<Lenkeknapp
						ref={c => { if (c){this.visSkjemaKnapp = c}}}
						onClick={this.props.onVisSkjema ? this.props.onVisSkjema : this.handleVoid}
						id={this.labelToId(this.props.endreLabel ? this.props.endreLabel : "") + "_lenke"}
					>
						{endreLabel}
					</Lenkeknapp>
				)}
				{skjemaErSynlig && avbrytLabel && (
					<div className="systeminfoMedSkjema__skjulSkjemaKnapp">
						<Lenkeknapp
							onClick={this.props.onSkjulSkjema ? this.props.onSkjulSkjema : this.handleVoid}
							id={this.labelToId(this.props.avbrytLabel ? this.props.avbrytLabel : "") + "_lenke"}
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
					stil="system"
				>
					<div className="systeminfoMedSkjema__info">{children}</div>
					{this.renderSkjema()}
				</Underskjema>
			</div>
		);
	}
}

export default SysteminfoMedSkjema;
