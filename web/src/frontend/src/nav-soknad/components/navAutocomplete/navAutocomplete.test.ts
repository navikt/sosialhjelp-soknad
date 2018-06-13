import { shallow } from "enzyme";
import NavAutocomplete, { autcompleteTilstand } from "./navAutocomplete";
import { Adresse } from "../../../digisos/skjema/personopplysninger/tps/Oppholdsadresse";

const setup = propOverrides => {

	const props = Object.assign({
		adresseFaktum={}
		onValgtVerdi={(adresse: Adresse) => this.handleVelgAutocompleteAdresse(adresse)}
	onOppdaterTilstand={(tilstand: autcompleteTilstand) => this.handleAutcompleteTilstand(tilstand)}
		onClearCompleted: jest.fn(),
	}, propOverrides)

	const wrapper = shallow(<NavAutocomplete {...props} />)

	return {
		props,
		wrapper,
		clear: wrapper.find('.clear-completed'),
		count: wrapper.find('.todo-count'),
	}
}

describe('nav autocomplete', () => {

	it('should display list of search results', () => {

	});

});