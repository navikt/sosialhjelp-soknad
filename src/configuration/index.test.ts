import {getContextPathFromWindowLocation} from "./index";

test("getContextPathForStaticContent window.location.pathname=/soknadsosialhjelp/informasjon", () => {
    expect(getContextPathFromWindowLocation("/digisos-1234/soknadsosialhjelp/some-more/stuff"))
        .toEqual("/digisos-1234/soknadsosialhjelp");
    expect(getContextPathFromWindowLocation("/soknadsosialhjelp/some-more/stuff"))
        .toEqual("/soknadsosialhjelp");
});