import * as React from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import DigisosIkon from "../digisosIkon/digisosIkon";
const Autocomplete = require("react-autocomplete");

export type NavAutocompleteIcon = "search" | "spinner" | "ok" | "warning";

interface Props {
	value: string;
	items: any[];
	getItemValue: (item: any) => string;

	open?: boolean;
	onSelect: (value: string, item: any) => void;
	onChange?: (event: any, value: any) => void;
	renderItem?: (item: any, isHighlighted: any) => React.ReactNode;
	placeholder?: string;
	icon?: NavAutocompleteIcon;
	caretPosition?: number;
}

interface StateProps {
	value: string;
	selectedItem: any;
	open: boolean;
	caretPosition?: number;
}

function setCaretPosition(ctrl: any, pos: number) {
	// Modern browsers
	if (ctrl.setSelectionRange) {
		ctrl.focus();
		ctrl.setSelectionRange(pos, pos);

	// IE8 and below
	} else if (ctrl.createTextRange) {
		const range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd("character", pos);
		range.moveStart("character", pos);
		range.select();
	}
}

class GenerellAutocomplete extends React.Component<Props, StateProps> {

	constructor(props: Props) {
		super(props);
		this.state = {
			value: "",
			selectedItem: null,
			open: this.props.open || false,
			caretPosition: this.props.caretPosition
		};
	}

	handleOnSelect(value: string, item: any) {
		this.props.onSelect(value, item);
	}

	handleOnChange(event: any, value: any) {
		this.setState({value});
		if (this.props.onChange) {
			this.props.onChange(event, value);
		}
	}

	componentDidUpdate(prevProps: Props, prevState: StateProps) {
		if (prevProps.caretPosition !== this.props.caretPosition && this.props.caretPosition > 0) {
			const input = document.getElementById("nav-autocomplete");
			setCaretPosition(input, this.props.caretPosition);
		}
		if (prevProps.value !== this.props.value) {
			this.setState({value: this.props.value});
		}
	}

	visIkon(): React.ReactNode {
		if (!this.props.icon) {
			return (<span/>);
		} else {
			return (
				<span className="valideringsStatus">
					{this.props.icon === "spinner" && (
						<span className="navAutcomplete__spinner">
							<NavFrontendSpinner  type="XS" />
						</span>
					)}
					{this.props.icon === "search" && <DigisosIkon navn="searchAddresse" />}
					{this.props.icon === "ok" && <DigisosIkon navn="checkCircle" />}
					{this.props.icon === "warning" && <DigisosIkon navn="advarselSirkel" />}
				</span>
			);
		}
	}

	render() {
		return (
			<div className="navAutcomplete">
				<Autocomplete
					value={this.props.value}
					items={ this.props.items }
					getItemValue={this.props.getItemValue}
					onChange={(event: any, value: string) => this.handleOnChange(event, value)}
					onSelect={(value: any, item: any) => this.handleOnSelect(value, item)}
					inputProps={{
						id: "nav-autocomplete",
						placeholder: this.props.placeholder || ""
					}}
					wrapperStyle={{position: "relative", display: "inline-block"}}
					renderMenu={(children: any) => (
						<span>
						{children.toString() === "" && (<span/>)}
							{children.toString() !== "" && (
								<div className="menu">
									{children}
								</div>)}
						</span>
					)}
					open={this.props.open}
					renderItem={(item: any, isHighlighted: any) => this.props.renderItem(item, isHighlighted)}
				/>
				{ this.visIkon()}
			</div>
		);
	}
}

export default GenerellAutocomplete;
