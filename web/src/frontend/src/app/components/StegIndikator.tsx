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
		"stegindikator__steg--aktiv": props.aktiv,
		"stegindikator__steg--inaktiv": props.inaktiv
	});
	return (
		<li className={className}>
			<span>
				{props.steg}
			</span>
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
				aria-label="Steg 1 - Navn på steg"
				aktiv={props.aktivtSteg === 1}
				inaktiv={props.aktivtSteg < 1}
			/>
			<Steg
				steg={2}
				tittel="Steg 2"
				aria-label="Steg 2 - Navn på steg 2"
				aktiv={props.aktivtSteg === 2}
				inaktiv={props.aktivtSteg < 2}
			/>
			<Steg
				steg={1}
				tittel="Steg 3"
				aria-label="Steg 3 - Navn på steg 3"
				aktiv={props.aktivtSteg === 3}
				inaktiv={props.aktivtSteg < 3}
			/>
		</ul>
	</div>;

export default StegIndikator;
