import { Faktum } from "../redux/faktaTypes";
import {
	Valideringsfeil,
	FaktumValideringsregler,
	ValideringKey
} from "./types";
import { getFaktumVerdi, getIntlTextOrKey } from "../utils";
import { InjectedIntl } from "react-intl";

const getFeilmelding = (
	intl: InjectedIntl,
	feilKey: string,
	faktumKey: string
): string => {
	const intlFeilKey =
		feilKey === ValideringKey.PAKREVD ? `${faktumKey}.feilmelding` : feilKey;

	return getIntlTextOrKey(intl, intlFeilKey);
};

export function validerFaktum(
	fakta: Faktum[],
	faktumKey: string,
	valideringsregler: FaktumValideringsregler[],
	intl: InjectedIntl
) {
	const valideringsfeil: Valideringsfeil[] = [];
	const faktumvalidering = valideringsregler.find(
		vr => vr.faktumKey === faktumKey
	);
	if (faktumvalidering) {
		const value = getFaktumVerdi(fakta, faktumKey);
		faktumvalidering.valideringer.forEach(v => {
			const feilKey = v(value);
			if (feilKey) {
				valideringsfeil.push({
					faktumKey: faktumvalidering.faktumKey,
					feil: {
						feilmelding: getFeilmelding(intl, feilKey, faktumKey)
					}
				});
			}
		});
	}
	return valideringsfeil;
}

export function validerAlleFaktum(
	fakta: Faktum[],
	valideringsregler: FaktumValideringsregler[],
	intl: InjectedIntl
): Valideringsfeil[] {
	let valideringsfeil: Valideringsfeil[] = [];
	valideringsregler.forEach(faktumvalidering => {
		const feil = validerFaktum(
			fakta,
			faktumvalidering.faktumKey,
			valideringsregler,
			intl
		);
		if (feil) {
			valideringsfeil = valideringsfeil.concat(feil);
		}
	});
	return valideringsfeil;
}
