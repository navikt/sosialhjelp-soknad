import * as React from "react";
import RadioPanelGruppe from "nav-frontend-skjema/lib/radio-panel-gruppe";
// import { Radio } from "nav-frontend-skjema";

interface Props {
	checked: string;
}

{/*<Radio*/}
	{/*className="soknadsosialhjelp"*/}
	{/*id={id}*/}
	{/*name={this.props.getName()}*/}
	{/*checked={this.checked()}*/}
	{/*disabled={disabled}*/}
	{/*value={value}*/}
	{/*required={required}*/}
	{/*onChange={(evt: any) => {*/}
		{/*this.props.setFaktumVerdiOgLagre(value, property);*/}
		{/*if (onChange != null) {*/}
			{/*onChange(evt);*/}
		{/*}*/}
	{/*}}*/}
	{/*label={*/}
		{/*this.determineLabel(id, faktumKey, tekster, value)*/}
	{/*}*/}
{/*/>*/}

class RadioSpike extends React.Component<{}, Props> {

	static radios = [
		{ label: 'Ja', value: 'juice1', id: 'juice1id' },
		{ label: 'Appelsinjuice', value: 'juice2', id: 'juice2id' },
		{ label: 'Melk', value: 'melk', disabled: true, id: 'melkid' },
		{ label: 'Ananasjuice', value: 'juice3', id: 'juice4id' }
	];

	constructor(props: any) {
		super(props);
		this.state = { checked: 'juice1' };
	}

	onChange = (event: any, value: any) => {
		this.setState({ checked: value });
	};

	render() {
		return (
			<RadioPanelGruppe
				name="samplename"
				legend="Hvilken drikke er best?"
				radios={RadioSpike.radios}
				checked={this.state.checked}
				onChange={this.onChange}
			/>
		);
	}
}

export default RadioSpike;