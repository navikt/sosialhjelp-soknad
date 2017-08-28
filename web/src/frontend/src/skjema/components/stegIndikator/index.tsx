import * as React from "react";
import * as classNames from "classnames";
import StegindikatorHake from "../svg/StegindikatorHake";

interface Props {
	aktivtSteg: number;
	steg: Array<{
		tittel: string;
		ariaLabel?: string;
	}>;
}

interface StegProps {
	steg: number;
	tittel: string;
	aktivtSteg: number;
}

export const StatusText = {
	ferdig: "Gjennomført",
	aktivt: "Aktivt"
};

const StatusTekst: React.StatelessComponent<StegProps> = (props: StegProps) => {
	if (props.steg > props.aktivtSteg) {
		return null;
	}
	return (
		<span className="invisible">
			{props.aktivtSteg === props.steg ? "Gjennomført: " : "Aktivt: "}
		</span>
	);
};

export const Steg: React.StatelessComponent<StegProps> = (props: StegProps) => {
	const className = classNames("stegindikator__steg", {
		"stegindikator__steg--aktiv": props.aktivtSteg === props.steg,
		"stegindikator__steg--inaktiv": props.aktivtSteg < props.steg
	});

	const passert = props.aktivtSteg > props.steg;
	return (
		<li className={className} aria-label={props.tittel}>
			<StatusTekst {...props} />
			{passert
				? <StegindikatorHake />
				: <span>
						{props.steg}
					</span>}
		</li>
	);
};

const StegIndikator: React.StatelessComponent<Props> = (props: Props) => {
	return (
		<div
			className="blokk--l"
			role="progressbar"
			aria-valuenow={props.aktivtSteg}
			aria-valuemin={1}
			aria-valuemax={props.steg.length}>
			<ul className="stegindikator">
				{props.steg.map((steg, idx) =>
					<Steg
						key={idx + 1}
						steg={idx + 1}
						aktivtSteg={props.aktivtSteg}
						tittel={steg.tittel}
					/>
				)}
			</ul>
		</div>
	);
};

export default StegIndikator;
