declare module "nav-frontend-hjelpetekst" {
	import * as React from "react";

	export interface HjelpetekstProps {
		id?: string;
		className?: string;
		tittel?: string;
		children: React.ReactNode;
	}

	export class HjelpetekstOver extends React.Component<HjelpetekstProps, {}> {}
	export class HjelpetekstUnder extends React.Component<HjelpetekstProps, {}> {}
	export class HjelpetekstHoyre extends React.Component<HjelpetekstProps, {}> {}
	export class HjelpetekstVenstre extends React.Component<
		HjelpetekstProps,
		{}
	> {}
	export class HjelpetekstAuto extends React.Component<HjelpetekstProps, {}> {}
	export class HjelpetekstMidt extends React.Component<HjelpetekstProps, {}> {}
}
