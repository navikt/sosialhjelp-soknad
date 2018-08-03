import * as React from "react";

import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import PersonFaktum from "../../../nav-soknad/faktum/PersonFaktum";
import { Faktum } from "../../../nav-soknad/types";
import { getFaktumPropertyVerdi } from "../../../nav-soknad/utils";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";
import { inputKeys } from "../../../nav-soknad/utils/faktumUtils";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";

interface BarnTypes {
	faktum: Faktum;
	fjernBarnTekst: string;
	fjernBarnAlterantivTekst: string;
	barnNummer: number;
	dispatch: any;
	visFjernBarn: boolean;
	onFjernBarn: (faktumId: number) => void;
}

type Props = FaktumComponentProps & BarnTypes & {id?: string};

export default class Barn extends React.Component<Props, {}> {
	personFaktum: PersonFaktum;

	constructor(props: Props) {
		super(props);
		this.focus = this.focus.bind(this);
	}

	componentDidMount() {
		if (this.props.barnNummer > 1) {
			this.personFaktum.focus();
		}
	}

	focus() {
		this.personFaktum.focus();
	}

	render() {
		const {
			faktum,
			barnNummer,
			fjernBarnTekst,
			fjernBarnAlterantivTekst,
			visFjernBarn
		} = this.props;
		const faktumKey = faktum.key;
		const hvormye = inputKeys(`${faktumKey}.grad`);
		const faktumId = faktum.faktumId;
		const navn = getFaktumPropertyVerdi(faktum, "navn");

		const alternativFjernTekst = (): string => {
			return `${fjernBarnAlterantivTekst} ${barnNummer} ${
				navn ? `(${navn})` : ""
			}`;
		};

		let idSamvaersgrad = null;
		let idFjernBarn = null;
		let idBorSammen = null;
		if (this.props.id) {
			idSamvaersgrad = this.props.id + "_samvaersgrad_nummer_input";
			idFjernBarn = this.props.id + "_fjern_barn_knapp";
			idBorSammen = this.props.id + "_bor_fast";
		}
		return (
			<div className="blokk barn">
				<SporsmalFaktum
					faktumKey={faktumKey}
					tittelRenderer={tittel => `${tittel} ${barnNummer}`}
				>
					<PersonFaktum
						id={this.props.id}
						faktumKey={faktumKey}
						faktumId={faktumId}
						ref={c => (this.personFaktum = c)}
					/>
					<JaNeiSporsmalFaktum
						id={idBorSammen}
						faktumKey={`${faktumKey}.borsammen`}
						faktumId={faktumId}
						skjemaTilhorerValg="nei"
						jaNeiPropFaktum={{
							property: "borsammen",
							faktumKey,
							faktumId
						}}
					>
						<SporsmalFaktum faktumKey={hvormye.faktum}>
							<BelopFaktum
								id={idSamvaersgrad}
								faktumKey={faktumKey}
								faktumId={faktumId}
								property="grad"
								maxLength={3}
								kunHeltall={true}
								bredde="XS"
							/>
							<span className="prosenttegn">%</span>
						</SporsmalFaktum>
					</JaNeiSporsmalFaktum>
					{visFjernBarn && (
						<span className="barn__fjern">
							<Lenkeknapp
								id={idFjernBarn}
								onClick={() =>
									this.props.onFjernBarn(this.props.faktum.faktumId)
								}
								skjermleserLabel={alternativFjernTekst()}
							>
								{fjernBarnTekst}
							</Lenkeknapp>
						</span>
					)}
				</SporsmalFaktum>
			</div>
		);
	}
}
