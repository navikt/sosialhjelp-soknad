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
		id: cuid()
	};

	render() {
		if (!this.props.status && !this.props.children) {
			return null;
		}
		return (
			<div
				className={classNames({
					invisible: !this.props.visible
				})}
				id={this.props.id}
				role="status"
				aria-atomic={this.props.atomic}
				aria-live={this.props.live}
			>
				{this.props.status || this.props.children}
			</div>
		);
	}
}

export default AriaStatus;
