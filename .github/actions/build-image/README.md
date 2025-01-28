# Build Image Action @ sosialhjelp-soknad

Inneholder gjenbrukbar logikk relevant for `sosialhjelp-soknad` for å
bygge et docker image.

## Inputs

-   `prefix`: sosialhjelp-soknad lager tags basert på config. (prod, dev, mock)

## Outputs

-   `full-tag`: Den fulle taggen inkludert prefix og artifact version

## Eksempel på bruk:

```yaml
- name: "Build Docker Image"
  uses: navikt/sosialhjelp-soknad/.github/actions/build-image@master
  with:
      prefix: ${{ env.NEXT_PUBLIC_DIGISOS_ENV }}
```
