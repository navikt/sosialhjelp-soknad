declare module "nav-frontend-skjema" {
	interface InputProps {
		label: string;
		feil?: { feilmelding: string };
		bredde?: "fullbredde" | "xxl" | "xl" | "l" | "m" | "s" | "xs" | "xxs";
		id?: string;
		name?: string;
		inputRef?: string;
		className?: string;
		inputClassName?: string;
	}

	export class Input extends React.Component<InputProps, {}> {}
}
