import polyfillObjectEntries from "../objectEntriesPolyfill";
polyfillObjectEntries();
import * as React from "react";
import { shallow } from "enzyme";
import App from "./index";

it("renders without crashing", () => {
	const wrapper = shallow(<App />);
	expect(wrapper).toMatchSnapshot();
});
