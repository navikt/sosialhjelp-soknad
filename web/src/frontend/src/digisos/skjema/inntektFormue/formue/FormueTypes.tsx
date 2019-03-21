export interface Formue {
    "brukskonto" : boolean;
    "sparekonto" : boolean;
    "bsu" : boolean;
    "livsforsikring" : boolean;
    "verdipapirer" : boolean;
    "annet" : boolean;
    "beskrivelseAvAnnet" : string;
}

export const initialFormueState: Formue = {
    "brukskonto" : false,
    "sparekonto" : false,
    "bsu" : false,
    "livsforsikring" : false,
    "verdipapirer" : false,
    "annet" : false,
    "beskrivelseAvAnnet" : ""
};
