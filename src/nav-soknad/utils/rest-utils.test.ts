import {getAbsoluteApiUrlRegex, parseGotoValueFromSearchParameters} from "./rest-utils";
import {CONTEXT_PATH} from "../../configuration";

test("that get getAbsoluteApiUrlRegex returns expected values", () => {
    expect(getAbsoluteApiUrlRegex(`/${CONTEXT_PATH}/skjema/1000232/5?visTekster=true`)).toEqual(
        "/sosialhjelp/soknad-api/"
    );
    expect(getAbsoluteApiUrlRegex(`/digisos-1348/${CONTEXT_PATH}/something-else/behind/here`)).toEqual(
        "/digisos-1348/sosialhjelp/soknad-api/"
    );
    expect(getAbsoluteApiUrlRegex(`/${CONTEXT_PATH}/skjema/1000232/5?visTekster=true`, true)).toEqual(
        "/sosialhjelp/login-api/soknad-api/"
    );
    expect(getAbsoluteApiUrlRegex(`/digisos-1348/${CONTEXT_PATH}/something-else/behind/here`, true)).toEqual(
        "/digisos-1348/sosialhjelp/login-api/soknad-api/"
    );
});

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
