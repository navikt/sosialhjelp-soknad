import * as React from "react";
import SVG from "react-inlinesvg";
import EllaForfra from "../../../nav-soknad/components/svg/EllaForfra";

const BannerEttersendelse: React.StatelessComponent<{ children: React.ReactNode } & {}> = ({ children }) => {
	return (
		<div className="banner-ettersendelse banner-ettersendelse__ettersendelse">
			<div className="blokk-center">
				<div className="banner-ettersendelse__ettersendelse__innhold">
					<div className="banner-ettersendelse__tittel">
						<h1 className="typo-sidetittel">
							{children}
						</h1>
					</div>
					<span className="banner-ettersendelse__ettersendelse__innhold__ella_forfra">
						<EllaForfra />
					</span>
					<SVG
						className="banner-ettersendelse__ettersendelse__innhold__laptop"
						src={"/sosialhjelp/soknad/statisk/bilder/illustrasjon_laptop.svg"}
					/>
				</div>
			</div>
		</div>
	);
};

export default BannerEttersendelse;
