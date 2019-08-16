import {getAbsoluteApiUrlRegex} from "./rest-utils";


test("that get getAbsoluteApiUrlRegex returns expected values", () => {
    expect(getAbsoluteApiUrlRegex("/soknadsosialhjelp/skjema/1000232/5?visTekster=true"))
        .toEqual("/soknadsosialhjelp-server/")
    expect(getAbsoluteApiUrlRegex("/digisos-1348/soknadsosialhjelp/something-else/behind/here"))
        .toEqual("/digisos-1348/soknadsosialhjelp-server/")
});