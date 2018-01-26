import * as React from "react";
import * as PropTypes from "prop-types";
import * as classNames from "classnames";
import * as cuid from "cuid";

/**
 * Komponent som "varsler" skjermleser når innholdet endrer seg, slik at det den leser den nye verdien
 */

export interface AriaStatusProps {
	status?: string;
	visible?: boolean;
	id?: string;
	atomic?: boolean;
	relevant?: "additions" | "additions text" | "all" | "removals" | "text";
	role?: "status" | "alert";
	live?: "assertive" | "off" | "polite";
}

class AriaStatus extends React.Component<AriaStatusProps, any> {
	static propTypes: any = {
		status: PropTypes.string,
		visible: PropTypes.bool,
		id: PropTypes.string,
		atomic: PropTypes.bool,
		live: PropTypes.string
	};

	static defaultProps: any = {
		visible: false,
		atomic: true,
		live: "assertive",
		role: "status",
		id: cuid()
	};

	render() {
		if (!this.props.status && !this.props.children) {
			return null;
		}
		return (
			<div
				className={classNames({
					kunSkjermleser: !this.props.visible
				})}
				id={this.props.id}
				role={this.props.role}
				aria-atomic={this.props.atomic}
				aria-live={this.props.live}
				aria-relevant={this.props.relevant}
			>
				{this.props.status || this.props.children}
			</div>
		);
	}
}

export default AriaStatus;
