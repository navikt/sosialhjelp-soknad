import cx from "classnames";
import {TextField} from "@navikt/ds-react";
import React from "react";
import {UseFormRegisterReturn} from "react-hook-form";

interface Props<T extends string> {
    registered: UseFormRegisterReturn<T>;
    label: JSX.Element;
    error?: React.ReactNode;
}

const OpplysningTextField = <T extends string>({registered, label, error}: Props<T>) => {
    return (
        <TextField
            {...registered}
            label={label}
            className={cx("pb-2")}
            error={error}
            autoComplete={"off"}
            htmlSize={20}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            }}
        />
    );
};

export default OpplysningTextField;
