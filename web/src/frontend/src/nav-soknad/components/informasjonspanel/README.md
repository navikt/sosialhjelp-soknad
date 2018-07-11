# Informasjonspanel

```jsx harmony
<Informasjonspanel>
  Denne teksten havner i et panel med runde hjørner og ikon.
</Informasjonspanel>
```

# Props

## icon

Kan være en react node:
```jsx harmony
<Informasjonspanel
    icon={<img src="/soknadsosialhjelp/statisk/bilder/illustrasjon_ella.svg"/>}
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

Eller "undefined". Da vises default ikon.

## children

ReactNode

## style

String className
