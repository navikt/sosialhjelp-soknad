import * as React from "react";

const Banner: React.StatelessComponent<{ children: React.ReactNode } & {}> = ({ children }) => {
	return (
		<div className="banner">
			<div className="blokk-center">
				<div className="banner__tittel">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Banner;
