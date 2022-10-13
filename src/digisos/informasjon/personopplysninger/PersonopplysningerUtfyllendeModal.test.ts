import {replaceNavkontor} from "./PersonopplysningerUtfyllendeModal";

describe("regex for modal", () => {
    it("skal rendre 'NAV-kontoret ditt'", () => {
        const tekst = "{navkontor:NAV-kontoret ditt}";
        expect(replaceNavkontor(tekst)).toEqual("NAV-kontoret ditt");
    });

    it("skal rendre valgt enhetsnavn", () => {
        const tekst = "{navkontor:NAV-kontoret ditt}";
        expect(replaceNavkontor(tekst, "NAV Oslo")).toEqual("NAV Oslo");
    });
});
