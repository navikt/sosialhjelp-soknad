import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from "./App";
import { pretty, TestContext } from "../testUtils";

it('renders app react component without crashing', () => {

	Enzyme.configure({ adapter: new Adapter() });

	// fakeBackend("/rest/endepunkt", {data: 123});

	const wrapper = mount(
		<MemoryRouter initialEntries={["/informasjon"]}>
			<TestContext>
				<App />
			</TestContext>
		</MemoryRouter>
	);

	expect(wrapper.find(".informasjon").length).toBe(1);
	// expect(wrapper.html()).toContain("123");
	console.log(pretty(wrapper.html()));

});
