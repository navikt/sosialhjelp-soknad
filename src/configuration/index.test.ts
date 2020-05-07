import {getContextPathFromWindowLocation} from "./index";

test("getContextPathForStaticContent window.location.pathname=/sosialhjelp/soknad/informasjon", () => {
    expect(getContextPathFromWindowLocation("/digisos-1234/sosialhjelp/soknad/some-more/stuff")).toEqual(
        "/digisos-1234/sosialhjelp/soknad"
    );
    expect(getContextPathFromWindowLocation("/sosialhjelp/soknad/some-more/stuff")).toEqual("/sosialhjelp/soknad");
});
