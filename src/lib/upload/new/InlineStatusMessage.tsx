import {InlineMessage, InlineMessageProps} from "@navikt/ds-react";
import cx from "classnames";

type Variant = "error" | "success" | "info" | "warning";

const variantClassMap: Record<Variant, string> = {
    error: "bg-ax-bg-danger-moderate border border-ax-border-danger text-ax-text-danger",
    success: "bg-ax-bg-success-moderate border border-ax-border-success-subtle text-ax-text-success",
    info: "bg-ax-bg-info-moderate border border-ax-border-info-subtle",
    warning: "bg-ax-bg-warning-moderate border border-ax-border-warning-subtle",
};

interface InlineStatusMessageProps extends Omit<InlineMessageProps, "status"> {
    variant: Variant;
    /** Use 'large' for post-submit messages with more padding (px-4 py-3). Defaults to 'small' (p-2). */
    padding?: "small" | "large";
    /** Stretches the inner span to full width, needed when children include a flex row layout. */
    fullWidth?: boolean;
}

const InlineStatusMessage = ({
    variant,
    padding = "small",
    fullWidth,
    className,
    ...props
}: InlineStatusMessageProps) => {
    const paddingClass = padding === "large" ? "px-4 py-3" : "p-2";
    const widthClass = fullWidth ? "[&>span]:w-full" : "";

    return (
        <InlineMessage
            status={variant}
            className={cx(variantClassMap[variant], paddingClass, "rounded-xl", widthClass, className)}
            {...props}
        />
    );
};

export default InlineStatusMessage;
