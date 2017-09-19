// import { Valideringsfeil } from "../../validering/types";

// /** Filtrerer slik at det kun er en feilmelding per faktum */
// export const filtrerFeilmeldinger = (
// 	feilmeldinger: Valideringsfeil[]
// ): Valideringsfeil[] => {
// 	if (!feilmeldinger) {
// 		return [];
// 	}

// 	// Går gjennom og sjekker at det er kun en feilmelding per faktum
// 	// Litt kryptisk funksjon, men funker
// 	return feilmeldinger.reduce(
// 		(arr: Valideringsfeil[], feil: Valideringsfeil) =>
// 			arr.findIndex(f => f.faktumKey === feil.faktumKey) >= 0
// 				? arr
// 				: [...arr, feil],
// 		[]
// 	);
// };
