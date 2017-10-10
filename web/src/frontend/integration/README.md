##e2e - Ende til ende tester

For å kjøre e2e test mot mock backend:
```
npm run e2e
```

For å kjøre e2e tester mot testmiljø:

```
node nightwatch.js --env chrome --url https://testmiljo.nav.no/soknadsosialhjelp/informasjon --username xxxxx --password xxxx --login true
```
 