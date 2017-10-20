declare module "nav-frontend-ikoner-assets" {
	import * as React from "react";

	export type icons =
		| "advarsel-sirkel"
		| "advarsel-trekant"
		| "advarsel-trekant-fylt"
		| "alarm"
		| "alarm-ny"
		| "help-circle"
		| "help-circle_hover"
		| "info-sirkel"
		| "info-sirkel-fylt"
		| "info-sirkel-orange"
		| "ok-sirkel"
		| "ok-sirkel-fylt"
		| "spinner"
		| "spinner-negativ"
		| "spinner-stroke"
		| "spinner-stroke-negativ"
		| "sporsmal-sirkel"
		| "stegindikator__hake";

	export interface IconProps {
		kind: icons;
		className?: string;
	}

	const t: new (props: IconProps) => React.Component<IconProps, any>;
	export default t;
}
