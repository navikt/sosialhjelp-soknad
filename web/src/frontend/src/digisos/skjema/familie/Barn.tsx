import * as React from "react";

import FaktumRadio from "../../../nav-soknad/faktum/RadioFaktum";
import SporsmalFaktum from "../../../nav-soknad/faktum/SporsmalFaktum";
import NivaTreSkjema from "../../../nav-soknad/components/nivaTreSkjema/index";
import PersonFaktum from "../../../nav-soknad/faktum/PersonFaktum";
import { Faktum } from "../../../nav-soknad/types";
import {
	faktumIsSelected,
	getPropertyVerdi,
	radioCheckKeys
} from "../../../nav-soknad/utils";
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

type Props = FaktumComponentProps & BarnTypes;

export default class Barn extends React.Component<Props, {}> {
	personFaktum: PersonFaktum;

	constructor(props: Props) {
		super(props);
		this.focus = this.focus.bind(this);
	}

	componentDidMount() {
		this.personFaktum.focus();
	}

	focus() {
		this.personFaktum.focus();
	}

	render() {
		const {
			fakta,
			faktum,
			barnNummer,
			fjernBarnTekst,
			fjernBarnAlterantivTekst,
			visFjernBarn
		} = this.props;
		const faktumKey = faktum.key;
		const borInfo = radioCheckKeys(`${faktumKey}.borsammen`);
		const hvormye = inputKeys(`${faktumKey}.grad`);
		const faktumId = faktum.faktumId;
		const alternativFjernTekst = (): string => {
			return `${fjernBarnAlterantivTekst} ${barnNummer}`;
		};
		return (
			<div className="blokk barn">
				<SporsmalFaktum
					faktumKey={faktumKey}
					tittelRenderer={tittel => `${tittel} ${barnNummer}`}>
					<PersonFaktum
						faktumKey={faktumKey}
						faktumId={faktumId}
						ref={c => (this.personFaktum = c)}
					/>
					<SporsmalFaktum faktumKey={borInfo.faktum}>
						<FaktumRadio
							faktumKey={faktumKey}
							value="true"
							property="borsammen"
							faktumId={faktumId}
						/>
						<NivaTreSkjema
							visible={faktumIsSelected(
								getPropertyVerdi(fakta, faktumKey, "borsammen", faktumId)
							)}>
							<SporsmalFaktum faktumKey={hvormye.faktum}>
								<BelopFaktum
									faktumKey={faktumKey}
									faktumId={faktumId}
									property="grad"
									maxLength={3}
									kunHeltall={true}
									bredde="XS"
								/>
							</SporsmalFaktum>
						</NivaTreSkjema>
						<FaktumRadio
							faktumKey={faktumKey}
							value="false"
							property="borsammen"
							faktumId={faktumId}
						/>
					</SporsmalFaktum>
					{visFjernBarn && (
						<span className="barn__fjern">
							<Lenkeknapp
								onClick={() =>
									this.props.onFjernBarn(this.props.faktum.faktumId)}
								label={fjernBarnTekst}
								alternativLabel={alternativFjernTekst()}
							/>
						</span>
					)}
				</SporsmalFaktum>
			</div>
		);
	}
}
