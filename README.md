Boilerplatekode for soknadsosialhjelper
================

## Oppsett for ny soknadsosialhjelp

1. Fork dette prosjektet til eget repository

2. Endre navn på soknadsosialhjelpen i de ulike filene (Pro-tip: CTRL+SHIFT+F og søk etter "soknadsosialhjelp" i prosjektet)

3. Rename package i `web/src/frontend/main/`

4. Endre GIT-url i hoved-pom til å gå mot det nye repoet

5. Endre konstantene i `web/src/frontend/app/js/felles/constants`

## Forberedelser for å kjøre

* Git må legges inn i PATH under system variables. Stien må gå til *bin*-mappen og ser typisk slik ut: *C:\Program Files (x86)\Git\bin*

* Installer node.js, finnes på *F:\F2990\Felles Filer\3 Forvaltningsseksjonen\3.4 Kontor for brukerdialog\Portaler og SBL forvaltning\7. Teknisk\Programmer\nodejs*. Bruk nyeste versjon.

* Sett opp npm og git. Følg guiden på http://confluence.adeo.no/display/navnofor/npm

* Kjør `maven clean install` for å laste ned alle JS-avhengigheter og bygge JS-modulene (hvis du starter Maven i en terminal, må den ha støtte for Git).

## Utvikling

* Sørg for at du har gulp installert. Kjør følgende kommando i terminalen: `npm install -g gulp`

* Start opp *sendsoknad* ved å starte Jetty i dette prosjektet.

* Start Jetty, finnes i *boilerplate-web/src/test/java/no/nav/sbl/soknadboilerplate/StartJetty.java*

* URL med dekoratør er *soknadboilerplate/app/start*

* Huk av profilen **dev-watch** og kjør `maven clean compile`. Dette vil starte *gulp watch*, som ligger og overvåker om endringer skjer i JS-, HTML-, og Less-filer og automatisk bygger om når de skjer.

* For å kjøre i IE må du gå mot hostname 127.0.0.1, og velg Document Mode: IE9 standars (IE9) i F12-vindu / ikke huk av for Compatibility View i settings (IE11).

## Deploy

* Sørg for at profilen **dev-watch** *ikke* er hukt av!

* Kjør `maven clean deploy`