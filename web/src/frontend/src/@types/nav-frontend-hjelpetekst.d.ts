declare module "nav-frontend-hjelpetekst" {
	import * as React from "react";

	export interface Props {
		id?: string;
		className?: string;
	}

	export class HjelpetekstOver extends React.Component<Props, {}> {}
	export class HjelpetekstUnder extends React.Component<Props, {}> {}
	export class HjelpetekstHoyre extends React.Component<Props, {}> {}
	export class HjelpetekstVenstre extends React.Component<Props, {}> {}
	export class HjelpetekstAuto extends React.Component<Props, {}> {}
	export class HjelpetekstMidt extends React.Component<Props, {}> {}
}
