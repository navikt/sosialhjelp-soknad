import {BodyShort, Label, Link} from "@navikt/ds-react";
import {Warning} from "./Warning";

export const Documentation = (props: {title: string; freeText?: string; files?: {filename: string; url: string}[]}) => {
    return (
        <div>
            <Label spacing>{props.title}</Label>
            {props.freeText && <BodyShort spacing>{props.freeText}kr</BodyShort>}
            {props.files ? (
                <ul>
                    {props.files.map((file) => (
                        <li key={file.filename}>
                            <BodyShort>
                                <Link href={file.url}>{file.filename}</Link>
                            </BodyShort>
                        </li>
                    ))}
                </ul>
            ) : (
                <Warning />
            )}
        </div>
    );
};
