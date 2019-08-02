# FadeCollapse

ReactCollapse med fade-in/fade-out av innholdet i Collapsen

```jsx harmony
<FadeCollapse>
  <div>Tekst</div>
</FadeCollapse>
```

## WARNING

Hvis man benytter margin-bottom på children til FadeCollapse, så vil det kunne oppstå problemer med animasjonen. Wrap istede det du ønsker i en ekstra div og bruk padding bottom på den.


## Eksempelbruk:

´´´
<FadeCollapse
    open={mottarBostotte === "false"}
>
    <InformasjonspanelTo
        farge={DigisosFarge.NAV_ORANSJE_LIGHTEN_40}
        ikon={InformasjonspanelIkon.ELLA}
    >
        <FormattedHTMLMessage id="informasjon.husbanken.bostotte"/>
    </InformasjonspanelTo>
</FadeCollapse>

´´´