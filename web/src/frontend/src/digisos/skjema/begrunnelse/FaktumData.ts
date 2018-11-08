import { finnFaktum, getFaktumVerdi, getPropertyVerdi, oppdaterFaktumMedVerdier } from "../../../nav-soknad/utils";
import { validerFaktum } from "../../../nav-soknad/validering/utils";
import { setFaktum } from "../../../nav-soknad/redux/fakta/faktaActions";
import { setFaktumValideringsfeil } from "../../../nav-soknad/redux/valideringActions";
import { Faktum } from "../../../nav-soknad/types";
import { FaktumValideringsregler, Valideringsfeil } from "../../../nav-soknad/validering/types";
import { Dispatch } from "react-redux";

interface FaktumStatus {
	faktum: Faktum;
	feilkode: Valideringsfeil;
}

/* Utilityklassse for lesing og skriving av faktumdata. */
class FaktumData {

	fakta: any;
	faktumKey: string;
	property: string;
	faktumId: number;
	ignorert?: boolean;
	dispatch: Dispatch<{}>;
	// TODO Disse må settes i constructor
	valideringsregler?: FaktumValideringsregler[];
	feilkode?: string;

	constructor(fakta: any, faktumKey: string, property: string, faktumId: number, dispatch: Dispatch<{}>) {
		this.fakta = fakta;
		this.faktumKey = faktumKey;
		this.property = property;
		this.faktumId = faktumId;
		this.dispatch = dispatch;
	}

	getPropertyVerdi(): string {
		return (
			getPropertyVerdi(
				this.fakta,
				this.faktumKey,
				this.property,
				this.faktumId
			) || ""
		);
	}

	getFaktumVerdi(): string {
		if (this.ignorert) {
			return "";
		}
		return this.property
			? this.getPropertyVerdi()
			: getFaktumVerdi(this.fakta, this.faktumKey) || "";
	}

	setFaktumVerdi(verdi: string, property?: string) {
		const res = this.validerOgOppdaterFaktum(verdi, property);
		this.dispatch(setFaktum(res.faktum));
		if (this.feilkode) {
			this.dispatch(
				setFaktumValideringsfeil(
					null,
					this.faktumKey,
					this.property,
					this.faktumId
				)
			);
		}
	}

	faktum(): Faktum {
		return finnFaktum(
			this.faktumKey,
			this.fakta,
			this.faktumId
		);
	}

	validerOgOppdaterFaktum(verdi: string, property?: string): FaktumStatus {
		const faktum = oppdaterFaktumMedVerdier(this.faktum(), verdi, property);
		const feilkode = validerFaktum({
			faktum,
			property,
			valideringsregler: this.valideringsregler
		});
		return {
			faktum,
			feilkode
		};
	}


}

export default FaktumData;
