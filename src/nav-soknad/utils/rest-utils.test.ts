import {getAbsoluteApiUrlRegex} from "./rest-utils";
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
