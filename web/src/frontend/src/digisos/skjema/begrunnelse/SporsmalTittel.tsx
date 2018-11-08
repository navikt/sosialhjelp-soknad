import * as React from "react";

const SporsmalTittel: React.StatelessComponent<{children: React.ReactNode}> = ({ children }) => {
	return (
		<h3 className="skjema-sporsmal__tittel">{children}</h3>
	);
};

export default SporsmalTittel;