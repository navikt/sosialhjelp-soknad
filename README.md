Soknadsosialhjelp
================

## Utvikling

* `npm install` 
* `npm start` - for lokal utvikling. Kjører opp creat-react-app-server i tillegg til en mocket backendserver
* `npm build` - bygger filer til buildmappen som videre blir kopiert til webappmappen men filnavn tilpasset nedetidsfrideploy.
 Tilsvarende oppsettet som kjører i miljøene. I tilegg må `startJetty`-javaklassen kjøres, `soknadsosialhjelp-tekster`
 må bygge lokal propertiesfil for tekstene ved å kjøre `mvn clean install -Ddev` samt start `sendsoknad` for reell backend.
 
 ## Tekster
 Tekstene ligger i repoert `soknadsosialhjelp-tekster` med felles byggejobb på `cisbl.devillo.no`. Tekstendringer blir automatisk
 deployet til miljø som er konfigurert opp i byggejobben. I tillegg har man en mocket tekstfil for lokal utvikling, men endringer
 gjort i denne må synces til teksterrepoet for å bli brukt i miljøene