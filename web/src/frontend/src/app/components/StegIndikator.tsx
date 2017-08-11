import * as React from "react";
import * as classNames from "classnames";

interface Props {
	aktivtSteg: number;
	antallSteg: number;
}

interface StegProps {
	steg: number;
	tittel: string;
	aktiv?: boolean;
	inaktiv?: boolean;
}

const Steg: React.StatelessComponent<StegProps> = (props: StegProps) => {
	const className = classNames("stegindikator__steg", {
		"stegindikator__steg--active": props.aktiv,
		"stegindikator__steg--inactive": props.inaktiv
	});
	return (
		<li className={className}>
			{props.steg}
		</li>
	);
};

const StegIndikator: React.StatelessComponent<Props> = (props: Props) =>
	<div
		className="blokk--l"
		role="progressbar"
		aria-valuenow={props.aktivtSteg}
		aria-valuemin={1}
		aria-valuemax={props.antallSteg}
	>
		<ul className="stegindikator">
			<Steg
				steg={1}
				tittel="Steg 1"
				aktiv={props.aktivtSteg === 1}
				inaktiv={props.aktivtSteg <= 1}
			/>
			<Steg
				steg={2}
				tittel="Steg 2"
				aktiv={props.aktivtSteg === 2}
				inaktiv={props.aktivtSteg <= 2}
			/>
			<Steg
				steg={1}
				tittel="Steg 3"
				aktiv={props.aktivtSteg === 3}
				inaktiv={props.aktivtSteg <= 3}
			/>
		</ul>
	</div>;

export default StegIndikator;
