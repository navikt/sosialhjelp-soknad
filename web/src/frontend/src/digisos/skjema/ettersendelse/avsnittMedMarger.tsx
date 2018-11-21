import * as React from "react";
import { MargIkon, MargIkoner } from "./margIkoner";

interface Props {
	children: React.ReactNode;
	venstreIkon?: MargIkoner;
	hoyreIkon?: MargIkoner;
	onClickHoyreIkon?: () => void;
	onClick?: () => void;
}

function ikonTitleText(ikon: string) {
	switch (ikon) {
		case MargIkoner.ADVARSEL:
			return "Advarsel";
		case MargIkoner.OK:
			return "Ok";
		case MargIkoner.PRINTER:
			return "Skriv ut";
		case MargIkoner.CHEVRON_OPP:
			return "Skjule";
		case MargIkoner.CHEVRON_NED:
			return "Vis";
		case MargIkoner.SØPPELBØTTE:
			return "Slett vedlegg";
		case MargIkoner.LAST_OPP:
			return "Last opp vedlegg";
		default:
			return "";
	}
}

/**
 * Vis et avsnitt med marger. Vis eventuelt ikoner i margene.
 * Hvis callback onClick er satt, vis peker og hovereffekt på mouseover for hele avsnitt.
 * Hvis callback onClickHoyreIkon er satt, vis peker og hovereffekt på mouseover på ikonet.
 *
 */
const AvsnittMedMarger: React.StatelessComponent<Props> = (
	{ children, venstreIkon, hoyreIkon, onClickHoyreIkon, onClick }) => {

	function handleOnClick() {
		if (onClick) {
			onClick();
		}
	}

	const content = <>
		<div className="venstremarg">
			{venstreIkon && (<MargIkon ikon={venstreIkon}/>)}
		</div>
		<div className="avsnitt">
			{children}
		</div>
		{hoyreIkon && (
			<span>
					{onClickHoyreIkon && (
						<a
							href="#"
							className="hoyremarg hoyremarg__ikon hoyremarg__ikon__klikkbart hoyremarg__ikon__hover"
							onClick={() => onClickHoyreIkon()}
							title={ ikonTitleText(hoyreIkon) }
						>
							<MargIkon ikon={hoyreIkon}/>
						</a>
					)}
				{!onClickHoyreIkon && (
					<div className="hoyremarg hoyremarg__ikon">
						<MargIkon ikon={hoyreIkon}/>
					</div>
				)}
				</span>
		)}
		{!hoyreIkon && (
			<div className="hoyremarg"/>
		)}</>;

	if (onClick ) {
		return (
			<a
				href="#"
				className="avsnitt_med_marger avsnitt_med_marger__klikkbar"
				onClick={() => handleOnClick()}
				title="Vedlegg"
			>
				{content}
			</a>
		);
	} else {
		return (
			<div className="avsnitt_med_marger ">
				{content}
			</div>
		);
	}

};

export default AvsnittMedMarger;
