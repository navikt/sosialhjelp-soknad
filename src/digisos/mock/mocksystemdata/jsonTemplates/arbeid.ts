interface Arbeidsforhold {
  "arbeidsforholdIDnav": string,
  "ansettelsesPeriode": {
    "periode": {
      "fom": string,
      "tom": string
    }
  },
  "arbeidsavtale": Arbeidsavtale[]
  "arbeidsgiver": {
      "arbeidsgivernummer"?: string,
      "orgnummer"?: string,
      "navn"?: string,
      "ident"?: {
        "ident": string
      }
    }
}

interface Arbeidsavtale {
  "stillingsprosent": string
}

export interface ArbeidJSON {
  "arbeidsforhold": Arbeidsforhold[]
}