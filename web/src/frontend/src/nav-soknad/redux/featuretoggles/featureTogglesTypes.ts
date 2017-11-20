export enum FeatureTogglesActionTypeKeys {
	OK = "featuretoggles/OK",
	FEILET = "featuretoggles/FEILET",
	PENDING = "featuretoggles/PENDING",
	INIT = "featuretoggles/INIT",
	OTHER_ACTION = "__any_other_action_type__"
}

export type FeatureTogglesActionTypes =
	| HentetFeatureTogglesAction
	| HentFeatureTogglesAction
	| FeatureTogglesFeiletAction
	| FeatureTogglesInitAction
	| OtherAction;

interface HentetFeatureTogglesAction {
	type: FeatureTogglesActionTypeKeys.OK;
	data: object;
}

interface FeatureTogglesInitAction {
	type: FeatureTogglesActionTypeKeys.INIT;
}

interface HentFeatureTogglesAction {
	type: FeatureTogglesActionTypeKeys.PENDING;
}

interface FeatureTogglesFeiletAction {
	type: FeatureTogglesActionTypeKeys.FEILET;
	feilmelding: string;
}

export interface OtherAction {
	type: FeatureTogglesActionTypeKeys.OTHER_ACTION;
}

export interface FeatureTogglesApiType {
	data: {};
	status: FeatureTogglesActionTypeKeys;
}
