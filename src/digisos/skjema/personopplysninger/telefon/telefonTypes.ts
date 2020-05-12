export interface Telefonnummer {
    brukerdefinert: null | boolean;
    systemverdi: null | string;
    brukerutfyltVerdi: null | string;
}

export const initialTelefonnummerState: Telefonnummer = {
    brukerdefinert: false,
    systemverdi: null,
    brukerutfyltVerdi: null,
};
