import * as React from "react";

const Banner: React.StatelessComponent<{ children: React.ReactNode } & {}> = ({ children }) => {
	return (
		<div className="banner banner__ettersendelse">
			<div className="blokk-center">
				<div className="banner__ettersendelse__innhold">
					<div className="banner__tittel">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
