import * as React from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {ArrowRightIcon} from "@navikt/aksel-icons";
import {SkjemaStegCancelButtons} from "./SkjemaStegCancelButtons.tsx";
import {useState} from "react";

interface SkjemaStegButtonsV2Props {
    isFinalStep?: boolean;
    onNext: () => Promise<any>;
    onPrevious?: () => Promise<any>;
}

export const SkjemaStegButtons = ({onNext, onPrevious, isFinalStep}: SkjemaStegButtonsV2Props) => {
    const {t} = useTranslation("skjema");
    const [isPending, setIsPending] = useState<boolean>(false);

    const nextButtonText = isFinalStep ? "skjema.knapper.send" : "skjema.knapper.neste";
    const nextButtonIcon = isPending ? <Loader /> : <ArrowRightIcon />;

    const onClickNext = async () => {
        setIsPending(true);
        await onNext();
        setIsPending(false);
    };

    return (
        <div>
            <div className={"!mt-12 md:!mt-16 lg:!mt-24 !mb-8 lg:!mb-16 space-x-3"}>
                <Button variant="secondary" onClick={onPrevious} disabled={onPrevious === undefined}>
                    {t("skjema.knapper.forrige")}
                </Button>
                <Button
                    variant="primary"
                    onClick={onClickNext}
                    disabled={isPending}
                    icon={nextButtonIcon}
                    iconPosition={"right"}
                >
                    {t(nextButtonText)}
                </Button>
            </div>
            <SkjemaStegCancelButtons />
        </div>
    );
};
