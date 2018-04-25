import * as React from "react";
import { MargIkon, MargIkoner } from "./margIkoner";

interface Props {
	children: React.ReactNode;
	venstreIkon?: MargIkoner;
	hoyreIkon?: MargIkoner;
	onClickHoyreIkon?: () => void;
	onClick?: () => void;
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

	return (
		<div
			className={ "avsnitt_med_marger " + (onClick ? "avsnitt_med_marger__klikkbar" : "") }
			onClick={() => handleOnClick()}
		>
			<div className="venstremarg">
				{venstreIkon && (<MargIkon ikon={venstreIkon}/>)}
			</div>
			<div className="avsnitt">
				{children}
			</div>
			{hoyreIkon && (
				<span>
					{onClickHoyreIkon && (
						<div
							className="hoyremarg hoyremarg__ikon hoyremarg__ikon__klikkbart hoyremarg__ikon__hover"
							onClick={() => onClickHoyreIkon()}
						>
							<MargIkon ikon={hoyreIkon}/>
						</div>
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
			)}
		</div>
	);
};

export default AvsnittMedMarger;
