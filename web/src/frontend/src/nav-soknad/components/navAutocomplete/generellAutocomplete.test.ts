import { shallow } from "enzyme";
import GenerellAutocomplete from "./generellAutocomplete";

function setup(): any {
	const props = Object.assign({
		value: "",
		items: ["aaa", "aba", "bbb", "bbc"],
		onSelect: jest.fn(),
		getItemValue: jest.fn(),

	});
	let wrapper =  shallow(
		<GenerellAutocomplete
			value=""			items={["aaa", "aba", "bbb", "bbc"]}
			onSelect={jest.fn()}
			getItemValue={jest.fn()}
		/>);
	return { props, wrapper};
}

describe("generell autocomplete", () => {

	it("should display ikons", () => {
		const { props} = setup();
		expect(props.value).toBe("");
	});
});