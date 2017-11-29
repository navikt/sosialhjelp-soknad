import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { getFaktumSporsmalTekst } from "../utils";
import Sporsmal from "../components/sporsmal/Sporsmal";
import {
	faktumComponent,
	InjectedFaktumComponentProps
} from "./FaktumComponent";

export interface OwnProps {
	faktumKey: string;
	children: React.ReactNode;
	visible?: boolean;
	htmlRef?: (c: any) => HTMLElement;
	style?: "normal" | "system";
	tittelRenderer?: (title: string) => React.ReactNode;
}

type Props = OwnProps & InjectedFaktumComponentProps & InjectedIntlProps;

class SporsmalFaktum extends React.Component<Props, {}> {
	mounted: boolean;

	constructor(props: Props) {
		super(props);
		this.handleOnBlur = this.handleOnBlur.bind(this);
		this.harValidering = this.harValidering.bind(this);
	}

	componentDidMount() {
		this.mounted = true;
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	harValidering() {
		return (
			this.props.required ||
			(this.props.validerFunc && this.props.validerFunc.length > 0)
		);
	}

	handleOnBlur(evt: any) {
		if (this.harValidering()) {
			setTimeout(() => {
				if (this.mounted) {
					this.props.validerFaktum();
				}
			}, 0);
		}
	}

	render() {
		const {
			visible,
			tittelRenderer,
			style,
			htmlRef,
			faktumKey,
			intl,
			children
		} = this.props;
		if (visible === false) {
			return null;
		}
		return (
			<Sporsmal
				feil={this.harValidering() ? this.props.getFeil(intl) : null}
				handleOnBlur={this.handleOnBlur}
				style={style}
				htmlRef={htmlRef}
				tekster={getFaktumSporsmalTekst(intl, faktumKey)}
				visible={visible}
				tittelRenderer={tittelRenderer}
			>
				{children}
			</Sporsmal>
		);
	}
}

export default injectIntl(faktumComponent()(SporsmalFaktum));
