import * as React from "react";
import { shallow } from "enzyme";
import TextPlaceholder from "./TextPlaceholder";
import { configEnzyme } from "../../../utils/unitTestUtils";

describe("placeholder som animerte striper", () => {

	configEnzyme();

	it("should return the specified number of lines", () => {
		let wrapper = shallow(<TextPlaceholder lines={3}/>);
		expect(wrapper.find('.bar').length).toEqual(3);
		wrapper.unmount();

		wrapper = shallow(<TextPlaceholder lines={4}/>);
		expect(wrapper.find('.bar').length).toEqual(4);
		wrapper.unmount();

		wrapper = shallow(<TextPlaceholder lines={4}/>);
		expect(wrapper.find('.bar').length).toEqual(4);
		wrapper.unmount();
	});

});

