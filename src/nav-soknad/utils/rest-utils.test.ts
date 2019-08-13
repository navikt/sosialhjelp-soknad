import {erHerokuFeatureBranch} from "./rest-utils";

test('hvis window.location.pathname=/something/soknadsosialhjelp/informasjon, så erHerokuFeatureBranch returnere true', () => {
    expect(erHerokuFeatureBranch("/digisos-1348/soknadsosialhjelp/informasjon")).toBeTruthy()
});

test('hvis window.location.pathname=/soknadsosialhjelp/informasjon, så skal erHerokuFeatureBranch returnere false', () => {
    expect(erHerokuFeatureBranch("/soknadsosialhjelp/informasjon")).toBeFalsy();
});
