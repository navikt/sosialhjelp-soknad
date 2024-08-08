import dot from "dot-object";
import {readOriginalFile} from "./lib/readOriginalFile";
import {orderObjectByKeys} from "./lib/orderObjectByKeys";
import {solveStringObjectDuplication} from "./lib/solveStringObjectDuplication";
import {stringifyNumericKeys} from "./lib/stringifyNumericKeys";
import {deleteObsoleteRootKeys} from "./lib/deleteObsoleteRootKeys";
import {saveTypescriptObject} from "./lib/saveTypescriptObject";
import {moveDokumentasjonKeys} from "./lib/moveDokumentasjonKeys";
import {deleteObsoleteKeys} from "./lib/deleteObsoleteKeys";

const LANGUAGES = ["nb", "en", "nn"] as const;

LANGUAGES.forEach(async (language) => {
    const originalFileBytes = await readOriginalFile(`../../../public/locales/${language}/skjema.json`);
    const originalFile = stringifyNumericKeys(originalFileBytes);

    const dedupedAndSortedFile = solveStringObjectDuplication(orderObjectByKeys(deleteObsoleteKeys(originalFile)));

    // Splitt ut tekstnøkler som har med dokumentasjon å gjøre
    const dokumentasjon = dot.object(moveDokumentasjonKeys(dedupedAndSortedFile));
    saveTypescriptObject(
        dokumentasjon,
        `./src/locales/${language}/dokumentasjon.ts`,
        "dokumentasjon",
        "Record<VedleggFrontendType, DokumentasjonTexts>",
        `import {VedleggFrontendType} from "../../generated/client/model";\nimport {DokumentasjonTexts} from "../types";`
    );

    // Fjern nøkler som ikke lenger er i bruk
    const pruned = deleteObsoleteRootKeys(dot.object(dedupedAndSortedFile));

    saveTypescriptObject(pruned, `./src/locales/${language}/skjema.ts`, "skjema");
});
