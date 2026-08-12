import {useDokumentasjonTekster} from "../../../../lib/hooks/dokumentasjon/useDokumentasjonTekster.ts";
import {DokumentasjonDtoType} from "../../../../generated/new/model";
import {DokumenterUpload} from "./DokumenterUpload.tsx";

interface Props {
    className?: string;
    describedBy?: string;
    hideAlreadyUploaded?: boolean;
    kategori: DokumentasjonDtoType;
    soknadId: string;
    contextId: string;
}

/**
 * Opplasting av dokumentasjon i standard søknad.
 *
 * Ledeteksten hentes fra dokumentasjonstekstene for kategorien.
 * For kort søknad, se `KortDokumenter`.
 */
export const NewDokumenter = (props: Props) => {
    const {dokumentBeskrivelse} = useDokumentasjonTekster(props.kategori);

    return <DokumenterUpload {...props} label={dokumentBeskrivelse} />;
};
