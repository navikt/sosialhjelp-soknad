import { REST_STATUS } from "../../types";

export enum InitActionTypeKeys {
	INIT = "init/INIT",
	START = "init/START",
	OK = "init/OK",
	FEILET = "init/FEILET"
}

export type InitActionTypes = StartAction | FerdigAction | FeiletAction;

interface StartAction {
	type: InitActionTypeKeys.START;
}

interface FerdigAction {
	type: InitActionTypeKeys.OK;
}

interface FeiletAction {
	type: InitActionTypeKeys.FEILET;
}

export interface InitState {
	restStatus: REST_STATUS;
}
