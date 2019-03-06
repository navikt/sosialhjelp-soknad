# Informasjonspanel

Vises panel med runde hjørner og ikon.

```jsx harmony
<Informasjonspanel>
  Denne teksten havner i et panel med runde hjørner og ikon.
</Informasjonspanel>
```

# Props

## synlig

Hvis synlig er satt og endrer verdi fra false til true, 
så trigges en animasjon som ekspanderer og fader in panelet.

## icon

Kan være en react node:
```jsx harmony
<Informasjonspanel
    icon={<img src="/sosialhjelp/soknad/statisk/bilder/illustrasjon_ella.svg"/>}
>
  Innhold.
</Informasjonspanel>
```
En streng:
```jsx harmony
<Informasjonspanel
    icon="illustrasjon_ella.svg"
>
  Innhold.
</Informasjonspanel>
```

Hvis ikke satt, så vises default ikon.

## children

ReactNode

## style

String med className
