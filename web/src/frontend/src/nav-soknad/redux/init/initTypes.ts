export enum InitActionTypeKeys {
	START = "init/START",
	SUCCESS = "init/SUCCESS"
}

export type InitActionTypes = StartAction | SuccessAction;

interface StartAction {
	type: InitActionTypeKeys.START;
}

interface SuccessAction {
	type: InitActionTypeKeys.SUCCESS;
}

export interface InitState {
	henterData: boolean;
	harTilgang: boolean;
}
