declare module "nav-frontend-spinner" {
	interface Spinner {
		negativ?: boolean;
		stroke?: boolean;
		type?: "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
		className?: string;
		ariaLabel?: string;
	}
	const t: new (props: Spinner) => React.Component<Spinner, any>;
	export default t;
}
