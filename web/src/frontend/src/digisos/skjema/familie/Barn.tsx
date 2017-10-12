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
import { FaktumComponentProps } from "../../../nav-soknad/redux/faktaReducer";
import BelopFaktum from "../../../nav-soknad/faktum/typedInput/BelopFaktum";
import { inputKeys } from "../../../nav-soknad/utils/faktumUtils";
import FjernLenke from "../../../nav-soknad/components/fjernLenke/fjernlenke";

interface BarnTypes {
	faktum: Faktum;
	fjernBarnTekst: string;
	fjernBarnAlterantivTekst: string;
	barnNummer: number;
	dispatch: any;
	visFjernlenke: boolean;
	onFjernBarn: (faktumId: number) => void;
}

export default class Barn extends React.Component<
	FaktumComponentProps & BarnTypes,
	{}
> {
	sporsmalFaktum: HTMLElement;

	componentDidMount() {
		if (this.sporsmalFaktum) {
			this.sporsmalFaktum.focus();
		}
	}

	focus() {
		this.sporsmalFaktum.focus();
	}

	render() {
		const {
			fakta,
			faktum,
			barnNummer,
			fjernBarnTekst,
			fjernBarnAlterantivTekst,
			visFjernlenke
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
					htmlRef={c => (this.sporsmalFaktum = c)}
					tittelRenderer={tittel => `${tittel} ${barnNummer}`}
				>
					<PersonFaktum faktumKey={faktumKey} faktumId={faktumId} />
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
							)}
						>
							<SporsmalFaktum faktumKey={hvormye.faktum}>
								<BelopFaktum
									faktumKey={faktumKey}
									faktumId={faktumId}
									property="grad"
									maxLength={3}
									kunHeltall={true}
									bredde="xs"
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
					{visFjernlenke && (
						<FjernLenke
							fjern={() => this.props.onFjernBarn(this.props.faktum.faktumId)}
							lenketekst={fjernBarnTekst}
							alternativLenketekst={alternativFjernTekst()}
						/>
					)}
				</SporsmalFaktum>
			</div>
		);
	}
}
