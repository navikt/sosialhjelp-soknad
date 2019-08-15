import {getAbsoluteApiUrlRegex} from "./rest-utils";


test("that get getAbsoluteApiUrlRegex returns expected values", () => {
    expect(getAbsoluteApiUrlRegex("/sosialhjelp/soknad/skjema/1000232/5?visTekster=true"))
        .toEqual("/sosialhjelp/soknad-api/")
    expect(getAbsoluteApiUrlRegex("/digisos-1348/sosialhjelp/soknad/something-else/behind/here"))
        .toEqual("/digisos-1348/sosialhjelp/soknad-api/")
});