# Informasjonspanel

Vises panel med runde hjørner og ikon.

```jsx harmony
<InformasjonspanelEkspanderbart>
  Denne teksten havner i et panel med runde hjørner og ikon.
</InformasjonspanelEkspanderbart>
```

# Props

## synlig

Hvis synlig er satt og endrer verdi fra false til true, 
så trigges en animasjon som ekspanderer og fader in panelet.

## icon

Kan være en react node:
```jsx harmony
<InformasjonspanelEkspanderbart
    icon={<img src="/soknadsosialhjelp/statisk/bilder/illustrasjon_ella.svg"/>}
>
  Innhold.
</InformasjonspanelEkspanderbart>
```
En streng:
```jsx harmony
<InformasjonspanelEkspanderbart
    icon="illustrasjon_ella.svg"
>
  Innhold.
</InformasjonspanelEkspanderbart>
```

Hvis ikke satt, så vises default ikon.

## children

ReactNode

## style

String med className
