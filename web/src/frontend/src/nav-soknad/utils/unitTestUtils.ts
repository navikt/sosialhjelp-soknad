import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { IntlProvider } from "react-intl";
import { ReactElement } from "react";
import * as React from "react";
import { mount, shallow } from "enzyme";
import { ReactWrapper } from "enzyme";

export const configEnzyme = () => {
	Enzyme.configure({ adapter: new Adapter() });
};

export const setupReactIntl = (intlMessages: any) => {
	const intlProvider = new IntlProvider(
		{
			locale: 'nb-NO',
			messages: intlMessages
		},
		{}
	);
	const { intl } = intlProvider.getChildContext();
	const nodeWithIntlProp = (node: ReactElement<any>) => React.cloneElement(node, { intl });
	// @ts-ignore
	const mountWithIntl = (node: ReactElement<any>, { context, ...options } = {}) => {
		return mount(nodeWithIntlProp(node), {
			...options,
			context: {
				...context,
				intl
			}
		});
	};
	return mountWithIntl;
};

export const setupShallowReactIntl = (intlMessages: any) => {
	const intlProvider = new IntlProvider(
		{
			locale: 'nb-NO',
			messages: intlMessages
		},
		{}
	);
	const { intl } = intlProvider.getChildContext();
	const nodeWithIntlProp = (node: ReactElement<any>) => React.cloneElement(node, { intl });
	// @ts-ignore
	const shallowWithIntl = (node: ReactElement<any>, { context, ...options } = {}) => {
		return shallow(nodeWithIntlProp(node), {
			...options,
			context: {
				...context,
				intl
			}
		});
	};
	return shallowWithIntl;
};

export const harCheckboks = (wrapper: ReactWrapper) => wrapper.find('input[type="checkbox"]').length > 0;

export const harInputfelt = (wrapper: ReactWrapper) => wrapper.find('input[type="text"]').length > 0;
