declare module "soknadsosialhjelp-mocksystemdata" {

	export function settNavn(fornavn: string , mellomnavn: string, etternavn: string): void;

	export function settIdent(ident: string): void;

	export function settMidlertidigPostadresse(midlertidigPostadresseEgendefinertValue: string): void;

	export function settTelefonnummer(telefonnummer: string): void;

	export function settBankkontonummer(bankkontonummer: string) : void;

	export function settArbeidsforholdMedArbeidsgivernummer(id:string, startDato:string, sluttDato:string, stillingsProsent:string, arbeidsgiverNummer:string , arbeidsgiverNavn:string ): void;
	export function settArbeidsforholdMedIdent(id:string, startDato: string, sluttDato: string , stillingsProsent:string , ident:string ) : void;
	export function settArbeidsforholdMedOrganisasjonsnummer(id:string, startDato: string, sluttDato: string, stillingsProsent:string, orgnummer:string ): void;
	export function clearArbeidsforhold(): void;

	export function settOrganisasjon(orgnummer: string, navn: string) : void;
	export function clearOrganisasjon() : void;

	export function settEktefelleMedSammeBostedsadresse(ident: string, fornavn: string, mellomnavn: string, etternavn: string, foedselsdato: string): void;
	export function settEktefelleUtenSammeBostedsadresse(ident: string, fornavn: string, mellomnavn: string, etternavn: string, foedselsdato: string): void;
	export function settEktefelleMedKodeSeks(ident: string, fornavn: string, mellomnavn: string, etternavn: string, foedselsdato: string): void;
	export function settEktefelleMedKodeSyv(ident: string, fornavn: string, mellomnavn: string, etternavn: string, foedselsdato: string): void;

	export function settBarnSammeBostedsadresse(ident: string, fornavn: string, mellomnavn: string, etternavn: string): void;
	export function settBarnIkkeSammeBostedsadresse(ident: string, fornavn: string, mellomnavn:string, etternavn:string): void;
	export function settBarnMedDoedsdato(ident: string, fornavn: string, mellomnavn: string, etternavn: string, doedsdato: string): void;
	export function clearFamilieforhold(): void;

	export function leggTilUtbetaling(periodeFom: string, periodeTom: string, posteringsdato:string, utbetalingsdato: string, forfallsdato: string): void;

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