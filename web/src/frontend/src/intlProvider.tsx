import * as React from "react";
import { addLocaleData, IntlProvider as Provider } from "react-intl";
import * as nb from "react-intl/locale-data/nb";

addLocaleData(nb);

function IntlProvider({children}: { children: React.ReactNode }) {
	const ledetekster = {data: {nb: {"skjema.tittel": "Søknad for økonomisk sosialhjelp"}}};
	const locale = "nb";
	return (
		<Provider messages={ ledetekster.data[locale] } defaultLocale="nb" locale={ locale }>
			{ children }
		</Provider>
	);
}

export default IntlProvider;
