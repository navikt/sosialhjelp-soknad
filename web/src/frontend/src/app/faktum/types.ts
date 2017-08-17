export enum ActionTypeKeys {
	SET_FAKTUM_VERDI = "SET_FAKTUM_VERDI",
	RESET_FAKTUM_VERDI = "RESET_FAKTUM_VERDI",
	OTHER_ACTION = "__any_other_action_type__"
}

export interface SetFaktumVerdiAction {
	type: ActionTypeKeys.SET_FAKTUM_VERDI;
	faktumKey: string;
	value: FaktumValueType;
	properties?: any;
}

export interface ResetFaktumVerdiAction {
	type: ActionTypeKeys.RESET_FAKTUM_VERDI;
	faktumKey: string;
}

export interface OtherAction {
	type: ActionTypeKeys.OTHER_ACTION;
}

export type FaktumValueType = string | number | boolean;
