import {Felt} from "../../generated/model";
import {SystemData} from "./question/SystemData";
import {SystemDataMap} from "./question/SystemDataMap";
import {ListOfValues} from "./question/ListOfValues";
import {Attachment} from "./question/Attachment";
import {FreeText} from "./question/FreeText";

export const SporsmalFelt = ({felt}: {felt: Felt[] | undefined}) => (
    <>
        <SystemData felter={felt?.filter(({type}) => type === "SYSTEMDATA")} />
        <SystemDataMap felter={felt?.filter(({type}) => type === "SYSTEMDATA_MAP")} />
        <ListOfValues felter={felt?.filter(({type}) => type === "CHECKBOX")} />
        <Attachment felter={felt?.filter(({type}) => type === "VEDLEGG")} />
        <FreeText felter={felt?.filter(({type}) => type === "TEKST")} />
    </>
);
