Feature: Digisos Header

  Tittelen på /soknadsosialhjelp/informasjon skal være
  "Søknad om økonomisk sosialhjelp"

  Scenario: Riktig header
    When jeg går til startsiden for digisos søknaden
    Then skal  jeg se en hovedtittel som sier "Søknad om økonomisk sosialhjelp"