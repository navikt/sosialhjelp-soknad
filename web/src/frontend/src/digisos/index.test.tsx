import polyfillObjectEntries from "../test/objectEntriesPolyfill";
polyfillObjectEntries();
(global as any).requestAnimationFrame = (callback: any) => {
	setTimeout(callback, 0);
};
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import * as React from "react";
import { shallow } from "enzyme";
import App from "./index";
import IntlProvider from "../intlProvider";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import reducers from "./redux/reducers";

function configureStore() {
	const middleware = applyMiddleware(thunk);
	return middleware(createStore)(reducers);
}

const store = configureStore();
it("renders without crashing", () => {
	const wrapper = shallow(
		<Provider store={store}>
			<IntlProvider>
				<App intl={null} />
			</IntlProvider>
		</Provider>
	);
	// expect(wrapper).toMatchSnapshot();
	expect(wrapper).toBeTruthy();
});
