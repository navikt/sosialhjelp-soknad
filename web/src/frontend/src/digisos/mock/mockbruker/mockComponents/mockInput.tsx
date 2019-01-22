import * as React from 'react';

interface Props {
	label: string;
	onChange: any;
	value: string;
}

class MockInput extends React.Component<Props, {}>{
	constructor(props: Props) {
		super(props);

	}

	render(){
		return(
			<div className="mock-input">
				<label className="mock-label">{ this.props.label }</label>
				<input onChange={(evt: any) => this.props.onChange(evt)} className="mock-input-felt" value={this.props.value} />
			</div>
		)
	}

}

export default MockInput;