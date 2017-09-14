Soknadsosialhjelp
================

## Kjøring lokalt 

* `npm install` 
* `npm start` - Starter webpack server og mock backend utviklet i node express.
* `npm test` - Kjør enhetstestene
* `npm test -- -u` - Oppdatert snapshotfilen som snapshottestene tester mot 
for lokal utvikling. 
 
## Kjøring via jetty

* `npm build` - bygger filer til buildmappen som videre blir kopiert til webappmappen
* `cd soknadsosialhjelp-tekster`
* `mvn clean install -Ddev` - bygger tekstfilene. Slår samme alle tekstfilene til lokal fil i temp folder.
* Start no.nav.sbl.dialogarena.StartSoknadJetty fra IntelliJ - Starter reel backend
* Start no.nav.sbl.soknadsosialhjelp.StartJetty fra IntelliJ - Starter frontend server
* Åpne `http://localhost:8189/soknadsosialhjelp/informasjon` i nettleser
 
 ## Tekster
 
 Tekstene ligger i repoert `soknadsosialhjelp-tekster` med felles byggejobb på `cisbl.devillo.no`. Tekstendringer blir automatisk
 deployet til miljø som er konfigurert opp i byggejobben. I tillegg har man en mocket tekstfil for lokal utvikling, men endringer
 gjort i denne må synces til teksterrepoet for å bli brukt i miljøene.
 