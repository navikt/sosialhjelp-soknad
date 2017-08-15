import Types from "./types";

export type FaktumValueType = string | number | boolean;

export function setFaktumVerdi(
	faktumKey: string,
	value: FaktumValueType,
	properties?: any
) {
	return {
		type: Types.SET_FAKTUM,
		payload: {
			faktumKey,
			value,
			properties
		}
	};
}
