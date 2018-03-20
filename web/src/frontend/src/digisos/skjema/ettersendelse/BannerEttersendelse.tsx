import * as React from "react";
import SVG from "react-inlinesvg";

const BannerEttersendelse: React.StatelessComponent<{ children: React.ReactNode } & {}> = ({ children }) => {
	return (
		<div className="banner banner__ettersendelse">
			<div className="blokk-center">
				<div className="banner__ettersendelse__innhold">
					<div className="banner__tittel">
						<h1 className="typo-sidetittel">
							{children}
						</h1>
					</div>
					<SVG
						className="banner__ettersendelse__innhold__william"
						src={"/soknadsosialhjelp/statisk/bilder/illustrasjon_william.svg"}
					/>
					<SVG
						className="banner__ettersendelse__innhold__laptop"
						src={"/soknadsosialhjelp/statisk/bilder/illustrasjon_laptop.svg"}
					/>
				</div>
			</div>
		</div>
	);
};

export default BannerEttersendelse;
