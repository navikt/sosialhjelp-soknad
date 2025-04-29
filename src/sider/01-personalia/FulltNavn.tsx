import {Navn} from "../../generated/new/model";

export const FullName = ({name}: {name?: Navn}) =>
    name ? [name.fornavn, name.mellomnavn, name.etternavn].join(" ").trim() : null;
