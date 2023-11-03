import {Loader} from "@navikt/ds-react";

export const ApplicationSpinner = () => (
    <div className={"grow w-full flex flex-col justify-center items-center"}>
        <Loader size="3xlarge" />
    </div>
);
