import * as React from "react";

import {
    Label,
    SkjemaelementFeilmelding,
    SkjemaGruppeFeilContext,
    SkjemaGruppeFeilContextProps,
} from "nav-frontend-skjema";
import {guid} from "nav-frontend-js-utils";
import classNames from "classnames";
import {Knapp} from "nav-frontend-knapper";

const cls = (className?: string) => classNames("skjemaelement", className);

export interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    description?: React.ReactNode;
    feil?: React.ReactNode | boolean;
    id?: string;
    label?: React.ReactNode;
    spinner?: boolean;
}

const FileUpload = (props: FileUploadProps) => {
    const inputId = props.id || guid();

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const onButtonClick = () => {
        if (fileInputRef && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <SkjemaGruppeFeilContext.Consumer>
            {(context: SkjemaGruppeFeilContextProps) => {
                const feilmelding = context.feil || props.feil;
                const feilmeldingId = context.feilmeldingId || guid();
                const descriptionId = props.description ? guid() : undefined;

                return (
                    <div className={cls(props.className)}>
                        {props.label && <Label htmlFor={inputId}>{props.label}</Label>}
                        {props.description && (
                            <div className="skjemaelement__description" id={descriptionId}>
                                {props.description}
                            </div>
                        )}
                        <input
                            type="file"
                            className="visuallyhidden"
                            id={inputId}
                            aria-invalid={!!feilmelding}
                            aria-describedby={descriptionId}
                            aria-errormessage={feilmelding ? feilmeldingId : undefined}
                            ref={fileInputRef}
                            onChange={props.onChange}
                            tabIndex={-1}
                            accept={
                                window.navigator.platform.match(/iPad|iPhone|iPod/) !== null
                                    ? "*"
                                    : "image/jpeg,image/png,application/pdf"
                            }
                        />
                        <Knapp
                            spinner={props.spinner}
                            disabled={props.disabled}
                            autoDisableVedSpinner={true}
                            onClick={onButtonClick}
                        >
                            Velg vedlegg
                        </Knapp>

                        {!context.feil && !!props.feil && (
                            <SkjemaelementFeilmelding id={feilmeldingId}>
                                {typeof feilmelding !== "boolean" && feilmelding}
                            </SkjemaelementFeilmelding>
                        )}
                    </div>
                );
            }}
        </SkjemaGruppeFeilContext.Consumer>
    );
};

export default FileUpload;
