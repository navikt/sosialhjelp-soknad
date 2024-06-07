import {Logg} from "./types";

export const logLocally = ({message, level}: Logg) => {
    switch (level) {
        case "ERROR":
            console.error(message);
            break;
        case "INFO":
            console.log(message);
            break;
        case "WARN":
            console.warn(message);
            break;
    }
};
