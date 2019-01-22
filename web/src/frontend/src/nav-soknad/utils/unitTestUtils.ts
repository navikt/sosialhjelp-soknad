import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { IntlProvider } from "react-intl";
import { ReactElement } from "react";
import * as React from "react";
import { mount } from "enzyme";

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
