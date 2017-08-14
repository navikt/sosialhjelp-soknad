declare module "nav-frontend-spinner" {
	interface Spinner {
		negativ?: boolean;
		stroke?: boolean;
		storrelse?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
		className?: string;
		ariaLabel?: string;
	}
	const t: new (props: Spinner) => React.Component<Spinner, any>;
	export default t;
}
