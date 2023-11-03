import {NavnFrontend} from "../../generated/model";

export const FullName = ({name}: {name?: NavnFrontend}) =>
    name ? [name.fornavn, name.mellomnavn, name.etternavn].join(" ").trim() : null;
