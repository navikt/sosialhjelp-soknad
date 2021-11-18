import {Button} from "@navikt/ds-react";
import * as React from "react";
import {MargIkon, MargIkoner} from "./margIkoner";

interface Props {
    children: React.ReactNode;
    venstreIkon?: MargIkoner;
    hoyreIkon?: MargIkoner;
    onClickHoyreIkon?: () => void;
    onClick?: () => void;
    className?: string;
}

function ikonButtonAriaLabel(ikon: string) {
    switch (ikon) {
        case MargIkoner.ADVARSEL:
            return "Advarsel";
        case MargIkoner.OK:
            return "Ok";
        case MargIkoner.PRINTER:
            return "Skriv ut";
        case MargIkoner.SØPPELBØTTE:
            return "Slett vedlegg";
        case MargIkoner.LAST_OPP:
            return "Last opp vedlegg";
        default:
            return "";
    }
}

/**
 * Vis et avsnitt med marger. Vis eventuelt ikoner i margene.
 * Hvis callback onClickHoyreIkon er satt, vis peker og hovereffekt på mouseover på ikonet.
 */
const AvsnittMedMarger: React.StatelessComponent<Props> = ({
    children,
    venstreIkon,
    hoyreIkon,
    onClickHoyreIkon,
    className,
}) => {
    const content = (
        <>
            <div className="venstremarg">{venstreIkon && <MargIkon ikon={venstreIkon} />}</div>
            <div className={"avsnitt " + className}>{children}</div>

            <div className="hoyremarg">
                {hoyreIkon && (
                    <>
                        {onClickHoyreIkon ? (
                            <Button
                                variant="tertiary"
                                onClick={() => onClickHoyreIkon()}
                                aria-label={ikonButtonAriaLabel(hoyreIkon)}
                            >
                                <MargIkon ikon={hoyreIkon} />
                            </Button>
                        ) : (
                            <MargIkon ikon={hoyreIkon} />
                        )}
                    </>
                )}
            </div>
        </>
    );

    return <div className="avsnitt_med_marger ">{content}</div>;
};

export default AvsnittMedMarger;
