import * as React from "react";

interface FaktumInputState {
	verdi: string;
}

export type FaktumInputProps = FaktumInputState & {
	setFaktumVerdi(verdi: string, property?: string): void;
};

export interface Props {
	render(state: FaktumInputProps): React.ReactNode,
}

class FaktumInput extends React.Component<Props, {}> {

	readonly state: FaktumInputState = {
		verdi: ""
	};

	setFaktumVerdi(verdi: string, property?: string): void {
		console.warn("Debug: FaktumInput.setFaktumVerdi: " + verdi);
	};

	render() {
		return this.props.render({
			...this.state,
			setFaktumVerdi: this.setFaktumVerdi
		});
	}

}


export default FaktumInput;
