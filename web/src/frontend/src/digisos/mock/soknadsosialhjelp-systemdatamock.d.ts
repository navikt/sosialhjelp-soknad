declare module "soknadsosialhjelp-systemdatamock" {

	export function settNavn(fornavn: string , mellomnavn: string, etternavn: string): void;
	export function settMidlertidigPostadresse(midlertidigPostadresseEgendefinertValue: string): void;
	export function settTelefonnummer(x: string): void;
	export function settBankkontonummer(bankkontonummer: string) : void;
	export function settArbeidsforholdMedArbeidsgivernummer(startDato:string, sluttDato:string, stillingsProsent:string, arbeidsgiverNummer:string , arbeidsgiverNavn:string ): void;
	export function settArbeidsforholdMedIdent(startDato: string, sluttDato: string , stillingsProsent:string , ident:string ) : void;
	export function settArbeidsforholdMedOrganisasjonsnummer( startDato: string, sluttDato: string, stillingsProsent:string, orgnummer:string ): void;

	export function getAdresserPath(): string;
	export function getAdresserJson(): object;
	export function getNorgPath(): string;
	export function getNorgJson() : object;
	export function getTelefonPath(): string;
	export function getTelefonJson(): object;
	export function getBrukerprofilPath(): string;
	export function getBrukerprofilJson(): object;
	export function getArbeidPath(): string;
	export function getArbeidJson(): object;
	export function getOrganisasjonPath(): string;
	export function getOrganisasjonJson(): object;
	export function getFamiliePath(): string;
	export function getFamilieJson(): object;
	export function getUtbetalingPath(): string;
	export function getUtbetalingJson(): object;
}