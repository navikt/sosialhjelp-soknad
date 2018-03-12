import * as React from "react";
import SVG from "react-inlinesvg";

const BannerEttersendelse: React.StatelessComponent<{ children: React.ReactNode } & {}> = ({ children }) => {
	return (
		<div className="banner banner__forside">
			<div className="blokk-center">
				<div className="banner__forside-wrapper">
					<div className="banner__tittel-tekst">
						<h1 className="typo-sidetittel">
							{children}
						</h1>
					</div>
					<div className="banner__illustrasjon">
						<SVG
							className="banner__illustrasjon__william"
							src={"/soknadsosialhjelp/statisk/bilder/illustrasjon_william.svg"}
						/>
						<SVG
							className="banner__illustrasjon__laptop"
							src={"/soknadsosialhjelp/statisk/bilder/illustrasjon_laptop.svg"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BannerEttersendelse;
