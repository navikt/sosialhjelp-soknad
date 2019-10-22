export const utbetalingJSON = {
    "posteringsdato": null,
    "utbetaltTil": {
        "aktoerId": "12345678910",
        "navn": "Dummy",
        "id": null,
        "diskresjonskode": null
    },
    "utbetalingNettobeloep": 3880,
    "utbetalingsmelding": null,
    "ytelseListe": [
        {
            "ytelsestype": {
                "value": "Barnetrygd",
                "kodeRef": null,
                "kodeverksRef": null
            },
            "ytelsesperiode": {
                "fom": null,
                "tom": null
            },
            "ytelseskomponentListe": [
                {
                    "ytelseskomponenttype": "Ordinær og utvidet",
                    "satsbeloep": 0,
                    "satstype": null,
                    "satsantall": null,
                    "ytelseskomponentbeloep": 3880
                }
            ],
            "ytelseskomponentersum": 3880,
            "trekkListe": [],
            "trekksum": 0,
            "skattListe": [],
            "skattsum": 0,
            "ytelseNettobeloep": 3880,
            "bilagsnummer": "568269505",
            "rettighetshaver": {
                "aktoerId": "12345678910",
                "navn": "Dummy",
                "id": null,
                "diskresjonskode": null
            },
            "refundertForOrg": {
                "aktoerId": "000000000",
                "navn": null,
                "id": null
            }
        },
        {
            "ytelsestype": {
                "value": "Onkel Skrue penger",
                "kodeRef": null,
                "kodeverksRef": null
            },
            "ytelsesperiode": {
                "fom": null,
                "tom": null
            },
            "ytelseskomponentListe": [
                {
                    "ytelseskomponenttype": "Sjekk",
                    "satsbeloep": 0,
                    "satstype": null,
                    "satsantall": null,
                    "ytelseskomponentbeloep": 10000.37
                },
                {
                    "ytelseskomponenttype": "Pengesekk",
                    "satsbeloep": 5000,
                    "satstype": "Dag",
                    "satsantall": 10,
                    "ytelseskomponentbeloep": 50000
                }
            ],
            "ytelseskomponentersum": 3880,
            "trekkListe": [],
            "trekksum": -500,
            "skattListe": [],
            "skattsum": -1337,
            "ytelseNettobeloep": 60000,
            "bilagsnummer": "568269566",
            "rettighetshaver": {
                "aktoerId": "12345678910",
                "navn": "Dummy",
                "id": null,
                "diskresjonskode": null
            },
            "refundertForOrg": {
                "aktoerId": "000000000",
                "navn": null,
                "id": null
            }
        }
    ],
    "utbetalingsdato": null,
    "forfallsdato": null,
    "utbetaltTilKonto": {
        "kontonummer": "32902095534",
        "kontotype": "Norsk bankkonto"
    },
    "utbetalingsmetode": "Norsk bankkonto",
    "utbetalingsstatus": "Utbetalt"
};
