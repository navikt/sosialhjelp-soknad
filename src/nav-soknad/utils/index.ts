export * from "./animationUtils";
export * from "./intlUtils";
export * from "./faktumUtils";
export * from "./navigasjonUtils";

// Fanger ikke opp www-q*.dev.nav.no
export const mockMiljoer = ["sosialhjelp-soknad-mock.dev.nav.no", "digisos.ekstern.dev.nav.no"];

// FIXME: Disse bør ikke utledes fra URL
export const erDev = () => window.location.href.indexOf("localhost:");
export const erMockAlt = () => mockMiljoer.some((miljo) => miljo.indexOf(window.location.href));

export const now = (): number => new Date().getTime();
