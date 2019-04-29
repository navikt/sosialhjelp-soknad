import * as React from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import DigisosIkon from "../../../../nav-soknad/components/digisosIkon/digisosIkon";

const AdressesokIkon: React.FunctionComponent<{ visSpinner: boolean}> = ({ visSpinner }) => {
	return (
		<span className="valideringsStatus">
			{visSpinner && (
				<span className="navAutcomplete__spinner">
					<NavFrontendSpinner type="XS"/>
				</span>
			)}
			{!visSpinner && (
				<span>
						<DigisosIkon navn="searchAddresse"/>
					</span>
			)}
			</span>
	);
};

export default AdressesokIkon;
