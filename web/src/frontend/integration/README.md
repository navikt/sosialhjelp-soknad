##e2e - Ende til ende tester

For å kjøre e2e test mot mock backend:
```
npm run e2e
```

For å kjøre e2e tester mot testmiljø:

Kjøring med Chrome:

```
node nightwatch.js --env chrome --url https://testmiljo.nav.no/sosialhjelp/soknad/informasjon --username xxxxx --password xxxx --login true
```

Kjøring med headless Chrome. Det vil si ikke noe nettleservindu:
 
```
node nightwatch.js --env headlesschrome --url https://testmiljo.nav.no/sosialhjelp/soknad/informasjon --username xxxxx --password xxxx --login true
```

Kjøring med PhantomJS.

```
node nightwatch.js --env phantomjs --url https://testmiljo.nav.no/sosialhjelp/soknad/informasjon --username xxxxx --password xxxx --login true
```

 