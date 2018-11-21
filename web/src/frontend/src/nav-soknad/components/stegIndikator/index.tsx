import * as React from "react";
import * as classNames from "classnames";
import StegindikatorHake from "../svg/StegindikatorHake";
import { FormattedMessage } from "react-intl";
import { tilSteg } from "../../redux/navigasjon/navigasjonActions";
import { Dispatch, DispatchProps } from "../../redux/reduxTypes";

interface OwnStegProps {
	steg: number;
	tittel: string;
	aktivtSteg: number;
}

const StatusTekst: React.StatelessComponent<OwnStegProps> = (props: OwnStegProps) => {
	if (props.steg > props.aktivtSteg) {
		return null;
	}
	return (
		<span className="kunSkjermleser">
			{props.aktivtSteg === props.steg ? (
				<FormattedMessage id="stegindikator.aktivt" />
			) : (
				<FormattedMessage id="stegindikator.gjennomfort" />
			)}
		</span>
	);
};

type StegProps = OwnStegProps & DispatchProps;

export const Steg: React.StatelessComponent<StegProps> = (props: StegProps) => {
	const className = classNames("stegindikator__steg", {
		"stegindikator__steg--aktiv": props.aktivtSteg === props.steg,
		"stegindikator__steg--inaktiv": props.aktivtSteg < props.steg
	});

	const gaTilSteg = (stegnummer: number) => {
		props.dispatch(tilSteg(stegnummer));
	};

	const passert = props.aktivtSteg > props.steg;
	return (
		<li className={className} aria-label={props.tittel} onClick={() => gaTilSteg(props.steg)}>
			<StatusTekst {...props} />
			{passert ? <StegindikatorHake /> : <span> {props.steg}</span>}
		</li>
	);
};

interface Props {
	aktivtSteg: number;
	steg: Array<{
		tittel: string;
		ariaLabel?: string;
	}>;
	dispatch: Dispatch;
}

const StegIndikator: React.StatelessComponent<Props> = (props: Props) => {
	return (
		<div
			className="blokk--l ikke-juridisk-tekst"
			role="progressbar"
			aria-valuenow={props.aktivtSteg}
			aria-valuemin={1}
			aria-valuemax={props.steg.length}
		>
			<ul className="stegindikator">
				{props.steg.map((steg, idx) => (
					<Steg
						key={idx + 1}
						steg={idx + 1}
						aktivtSteg={props.aktivtSteg}
						tittel={steg.tittel}
						dispatch={props.dispatch}
					/>
				))}
			</ul>
		</div>
	);
};

export default StegIndikator;
