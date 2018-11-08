import * as React from "react";

const SporsmalBeskrivelse: React.StatelessComponent<{children: React.ReactNode}> = ({ children }) => {
	return (
		<div className="skjema-sporsmal__beskrivelse">{children}</div>
	);
};

export default SporsmalBeskrivelse;
