import { call } from "redux-saga/effects";
import { fetchPost } from "../../../nav-soknad/utils/rest-utils";
import { ActionTypeKeys, NavLogEntry, NavLogInitAction, NavLogLevel } from "./navloggerTypes";
import { loggTilServerSaga } from "./navloggerSaga";

describe("navloggerSaga", () => {

	describe("logg feil til server - hovedflyt", () => {
		const logEntry: NavLogEntry = {
			level: NavLogLevel.INFO,
			message: "message"
		};
		const action: NavLogInitAction = {
			type: ActionTypeKeys.INIT,
			logEntry
		};

		const saga = loggTilServerSaga(action);

		it("fetch tekster", () => {
			expect(saga.next()).toEqual({
				done: false,
				value: call(fetchPost, "informasjon/actions/logg", JSON.stringify(logEntry))
			});
		});

	});

});
