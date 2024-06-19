import dot from "dot-object";
import {readOriginalFile} from "./lib/readOriginalFile.ts";
import {orderObjectByKeys} from "./lib/orderObjectByKeys.ts";
import {solveStringObjectDuplication} from "./lib/solveStringObjectDuplication.ts";
import {stringifyNumericKeys} from "./lib/stringifyNumericKeys.ts";
import {deleteObsoleteRootKeys} from "./lib/deleteObsoleteRootKeys.ts";
import {saveTypescriptObject} from "./lib/saveTypescriptObject.ts";
import {moveDokumentasjonKeys} from "./lib/moveDokumentasjonKeys.ts";
import {deleteObsoleteKeys} from "./lib/deleteObsoleteKeys.ts";

const LANGUAGES = ["nb", "en", "nn"] as const;

LANGUAGES.forEach(async (language) => {
    const originalFile = stringifyNumericKeys(
        await readOriginalFile(`../../../public/locales/${language}/skjema.json`)
    );

    const dedupedAndSortedFile = solveStringObjectDuplication(orderObjectByKeys(deleteObsoleteKeys(originalFile)));

    // Splitt ut tekstnøkler som har med dokumentasjon å gjøre
    const dokumentasjon = dot.object(moveDokumentasjonKeys(dedupedAndSortedFile));
    saveTypescriptObject(
        dokumentasjon,
        `./src/locales/${language}/dokumentasjon.ts`,
        "dokumentasjon",
        "Record<VedleggFrontendType, DokumentasjonTexts>",
        `import {VedleggFrontendType} from "../../generated/model";\nimport {DokumentasjonTexts} from "../types";`
    );

    // Fjern nøkler som ikke lenger er i bruk
    const pruned = deleteObsoleteRootKeys(dot.object(dedupedAndSortedFile));

    saveTypescriptObject(pruned, `./src/locales/${language}/skjema.ts`, "skjema");
});
