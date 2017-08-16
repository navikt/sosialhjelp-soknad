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
		label: string;
		name: string;
		checked?: boolean;
		radioRef?: Function;
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

	interface CheckboxProps extends React.HTMLProps<Checkbox> {
		className?: string;
		label: string;
		id?: string;
		checked?: boolean;
		feil?: {
			feilmelding: string;
		};
		checboxRef?: Function;
		value: string;
		defaultChecked?: boolean;
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

	interface TextareaProps extends React.HTMLProps<Textarea> {
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
	export class SkjemaGruppe extends React.Component<SkjemaGruppeProps, {}> {}
	export class Textarea extends React.Component<TextareaProps, {}> {}
}
