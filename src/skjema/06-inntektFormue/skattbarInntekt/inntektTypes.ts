import {SkattbarInntektInfo} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";
import {Organisasjon} from "../../../generated/model";

export interface SkattbarInntekt {
    organisasjoner: Organisasjon[];
}

export interface Utbetaling {
    brutto: number;
    forskuddstrekk: number;
    tittel: string;
}

export const initialSkattbarInntektInfoState: SkattbarInntektInfo = {
    inntektFraSkatteetaten: [],
    inntektFraSkatteetatenFeilet: false,
    samtykke: false,
    samtykkeTidspunkt: undefined,
};
export const initialSkattbarInntektState: SkattbarInntekt[] = [];
