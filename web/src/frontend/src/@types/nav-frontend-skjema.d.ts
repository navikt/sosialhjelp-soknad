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

	interface RadioProps extends React.HTMLProps<Radio> {
		className?: string;
		id?: string;
		label: React.ReactNode | any;
		name: string;
		checked?: boolean;
		radioRef?: Function;
		defaultChecked?: boolean;
		value: string;
	}

	export interface Feil {
		tittel?: string;
		feilmelding: string;
	}

	export interface InputProps extends React.HTMLProps<HTMLInputElement> {
		bredde?: inputBredde;
		className?: string;
		inputClassName?: string;
		feil?: Feil;
		id?: string;
		inputRef?: Function;
		label: string;
		name?: string;
	}

	interface CheckboxProps extends React.HTMLProps<Checkbox> {
		className?: string;
		label: React.ReactNode | any;
		id?: string;
		checked?: boolean;
		feil?: Feil;
		checboxRef?: Function;
		value: string;
		defaultChecked?: boolean;
	}

	interface SkjemagruppeProps {
		title: string;
		children: React.ReactNode | React.ReactNode[];
		className?: string;
		feil?: Feil;
	}

	interface TextareaProps extends React.HTMLProps<Textarea> {
		label: string;
		value: string;
		maxLength?: number;
		textareaClass?: string;
		id?: string;
		name?: string;
		feil?: Feil;
		tellerTekst?: Function;
		textareaRef?: Function;
	}

	export class Radio extends React.Component<RadioProps, {}> {}
	export class Checkbox extends React.Component<CheckboxProps, {}> {}
	export class Input extends React.Component<InputProps, {}> {}
	export class SkjemaGruppe extends React.Component<SkjemagruppeProps, {}> {}
	export class Textarea extends React.Component<TextareaProps, {}> {}
}
