export * from "./scrollToTop";
export * from "./formatTidspunkt";

// Fanger ikke opp www-q*.dev.nav.no
export const mockMiljoer = ["sosialhjelp-soknad-mock.dev.nav.no", "digisos.ekstern.dev.nav.no"];

// FIXME: Disse bør ikke utledes fra URL
export const isLocalhost = (location: string) => location.indexOf("localhost:") !== -1;
export const isMockAlt = (location: string) => mockMiljoer.some((miljo) => miljo.indexOf(location));
