import * as React from "react";

import JaNeiSporsmalFaktum from "../../../nav-soknad/faktum/JaNeiSporsmalFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import PersonFaktum from "../../../nav-soknad/faktum/PersonFaktum";
import { Faktum } from "../../../nav-soknad/types";
import { getFaktumPropertyVerdi } from "../../../nav-soknad/utils";
import { FaktumComponentProps } from "../../../nav-soknad/redux/fakta/faktaTypes";
import { inputKeys } from "../../../nav-soknad/utils/faktumUtils";
import Lenkeknapp from "../../../nav-soknad/components/lenkeknapp/Lenkeknapp";
import TallFaktum from "../../../nav-soknad/faktum/typedInput/TallFaktum";

interface BarnTypes {
	faktum: Faktum;
	fjernBarnTekst: string;
	fjernBarnAlterantivTekst: string;
	barnNummer: number;
	dispatch: any;
	visFjernBarn: boolean;
	onFjernBarn: (faktumId: number) => void;
}

type Props = FaktumComponentProps & BarnTypes;

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
		return (
			<div className="blokk barn">
				<SporsmalFaktum
					faktumKey={faktumKey}
					tittelRenderer={tittel => `${tittel} ${barnNummer}`}
				>
					<PersonFaktum
						faktumKey={faktumKey}
						faktumId={faktumId}
						ref={c => (this.personFaktum = c)}
					/>
					<JaNeiSporsmalFaktum
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
							<div className="container_enhetsbetegnelse">
								<TallFaktum
									faktumKey={faktumKey}
									faktumId={faktumId}
									property="grad"
									maxLength={3}
									maxAmount={50}
									kunHeltall={true}
									bredde="XS"
								/>
								<span>%</span>
							</div>
						</SporsmalFaktum>
					</JaNeiSporsmalFaktum>
					{visFjernBarn && (
						<span className="barn__fjern">
							<Lenkeknapp
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
