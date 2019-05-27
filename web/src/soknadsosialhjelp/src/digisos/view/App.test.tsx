import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from "./App";
import { pretty, TestContext } from "../testUtils";
const waitUntil = require('async-wait-until');

it('renders app react component without crashing', async () => {

	Enzyme.configure({ adapter: new Adapter() });

	const fetchMock = jest.spyOn(global, 'fetch');
	fetchMock.mockReturnValueOnce(Promise.resolve({
		json: function () {
			return Promise.resolve({
				"informasjon.tittel": "Informasjon"
			})
		}
	}));

	// fakeBackend("/rest/endepunkt", {data: 123});
	// const mockSuccessResponse = {"informasjon.tittel": "Informasjon"};
	// const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
	// const mockFetchPromise = Promise.resolve({ // 3
	// 	json: () => mockJsonPromise,
	// });
	// jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise); // 4

	// expect(global.fetch).toHaveBeenCalledTimes(1);

	// expect(global.fetch).toHaveBeenCalledWith('https://url-of-your-server.com/example/json');

	// const wrapper = shallow(<ExampleComponent />); // 5

	const wrapper = mount(
		<MemoryRouter initialEntries={["/informasjon"]}>
			<TestContext>
				<App />
			</TestContext>
		</MemoryRouter>
	);

	expect(wrapper.find(".informasjon").length).toBe(1);
	// expect(wrapper.html()).toContain("123");

	console.log("Test: " + JSON.stringify(wrapper.text(), null, 4));
	// await waitUntil(() => wrapper.instance.state.hasLoaded);
	console.log(pretty(wrapper.html()));

});
