import {NavnFrontend} from "../../generated/client/model";

export const FullName = ({name}: {name?: NavnFrontend}) =>
    name ? [name.fornavn, name.mellomnavn, name.etternavn].join(" ").trim() : null;
