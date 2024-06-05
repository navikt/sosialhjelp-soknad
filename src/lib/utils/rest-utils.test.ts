import {parseGotoValueFromSearchParameters} from "./rest-utils";
import {expect, test} from "vitest";

test("that parseGotoValueFromSearchParameters returns expected value", () => {
    expect(parseGotoValueFromSearchParameters("")).toEqual(undefined);
    expect(
        parseGotoValueFromSearchParameters("?randomString=randomVerdi&login_id=azuread_authentication_error")
    ).toEqual(undefined);
    expect(parseGotoValueFromSearchParameters(`?goto=/sosialhjelp/soknad/skjema/111111/1`)).toEqual(
        "/sosialhjelp/soknad/skjema/111111/1"
    );
    expect(
        parseGotoValueFromSearchParameters(
            `?goto=/sosialhjelp/soknad/skjema/111111/1&login_id=azuread_authentication_error`
        )
    ).toEqual("/sosialhjelp/soknad/skjema/111111/1");
    expect(
        parseGotoValueFromSearchParameters(
            `?login_id=azuread_authentication_error&goto=/sosialhjelp/soknad/skjema/111111/1`
        )
    ).toEqual("/sosialhjelp/soknad/skjema/111111/1");
    expect(
        parseGotoValueFromSearchParameters(`?goto=/sosialhjelp/soknad/skjema/111111/1&enAnnenViktigParameter=viktig`)
    ).toEqual("/sosialhjelp/soknad/skjema/111111/1&enAnnenViktigParameter=viktig");
});
