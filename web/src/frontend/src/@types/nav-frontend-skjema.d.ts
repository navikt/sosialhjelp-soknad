declare module "nav-frontend-skjema" {
	import * as React from "react";

	export type InputBredde =
		| "fullbredde"
		| "XXLl"
		| "XL"
		| "L"
		| "M"
		| "S"
		| "XS"
		| "XXS";

	type SelectBredde = "fullbredde" | "xxl" | "xl" | "l" | "m" | "s" | "xs";

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
		bredde?: InputBredde;
		className?: string;
		inputClassName?: string;
		feil?: Feil;
		id?: string;
		inputRef?: Function;
		label: string;
		name?: string;
	}

	interface CheckboxProps extends React.HTMLProps<Checkbox> {
		label: React.ReactNode | any;
		className?: string;
		id?: string;
		checked?: boolean;
		feil?: Feil;
		checboxRef?: Function;
		defaultChecked?: boolean;
	}

	interface SkjemagruppeProps {
		children: React.ReactNode | React.ReactNode[];
		title?: string;
		className?: string;
		feil?: Feil;
	}

	interface TextareaProps extends React.HTMLProps<Textarea> {
		label: React.ReactNode | any;
		value: string;
		maxLength?: number;
		textareaClass?: string;
		id?: string;
		name?: string;
		feil?: Feil;
		tellerTekst?: (antallTegn: number, maxLength: number) => string;
		textareaRef?: Function;
	}

	interface SelectProps extends React.HTMLProps<Select> {
		label: React.ReactNode | any;
		bredde?: SelectBredde;
		id?: string;
		className?: string;
		feil?: Feil;
		selectRef?: () => React.ReactElement<any>;
	}

	export class Radio extends React.Component<RadioProps, {}> {}
	export class Checkbox extends React.Component<CheckboxProps, {}> {}
	export class Input extends React.Component<InputProps, {}> {}
	export class SkjemaGruppe extends React.Component<SkjemagruppeProps, {}> {}
	export class Textarea extends React.Component<TextareaProps, {}> {}
	export class Select extends React.Component<SelectProps, {}> {}
}
