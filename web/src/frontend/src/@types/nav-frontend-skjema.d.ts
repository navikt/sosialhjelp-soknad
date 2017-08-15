declare module "nav-frontend-skjema" {
	import * as React from "react";

	type inputBredde =
		| "fullbredde"
		| "xxl"
		| "xl"
		| "l"
		| "m"
		| "s"
		| "xs"
		| "xxs";

	export interface RadioProps {
		className?: string;
		id?: string;
		label: string;
		name: string;
		radioRef?: Function;
		disabled?: string;
		onClick?: {};
		defaultChecked?: boolean;
		value: string;
	}

	export interface InputProps extends React.HTMLProps<HTMLInputElement> {
		bredde?: inputBredde;
		className?: string;
		inputClassName?: string;
		feil?: string;
		id?: string;
		inputRef?: Function;
		label: string;
		name?: string;
	}

	export interface CheckboxProps {
		className?: string;
		label: string;
		id?: string;
		feil?: {
			feilmelding: string;
		};
		checboxRef?: Function;
		value: string;
		name?: string;
		defaultChecked?: boolean;
		onClick?: Function;
	}

	interface Feil {
		feilmelding: string;
	}

	interface SkjemaGruppeProps {
		title?: string;
		children: React.ReactNode | React.ReactNode[];
		className?: string;
		feil?: Feil;
	}

	export class Checkbox extends React.Component<CheckboxProps, {}> {}
	export class Radio extends React.Component<RadioProps, {}> {}
	export class Input extends React.Component<InputProps, {}> {}
	export class SkjemaGruppe extends React.Component<SkjemaGruppeProps, {}> {}
}
