import { InjectedIntl } from "react-intl";

export function getIntlText(intl: InjectedIntl, key: string) {
	const text = intl.formatMessage({ id: key });
	return text === key ? null : text;
}
