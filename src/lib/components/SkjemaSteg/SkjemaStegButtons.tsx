import * as React from "react";
import {useState} from "react";
import {Button, Loader} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";
import {ArrowLeftIcon, ArrowRightIcon, PaperplaneIcon} from "@navikt/aksel-icons";
import {SkjemaStegCancelButtons} from "./SkjemaStegCancelButtons.tsx";

export const SkjemaStegButtons = ({
    onNext,
    onPrevious,
    isFinalStep,
}: {
    isFinalStep?: boolean;
    onNext: () => Promise<any>;
    onPrevious?: () => Promise<any>;
}) => {
    const {t} = useTranslation("skjema");
    const [isPending, setIsPending] = useState<boolean>(false);

    const nextButtonText = isFinalStep ? "skjema.knapper.send" : "skjema.knapper.neste";
    const nextButtonIcon = isPending ? (
        <Loader />
    ) : isFinalStep ? (
        <PaperplaneIcon aria-hidden={true} />
    ) : (
        <ArrowRightIcon aria-hidden={true} />
    );

    const onClickNext = async () => {
        setIsPending(true);
        await onNext();
        setIsPending(false);
    };

    return (
        <nav>
            <div className={"flex !mt-12 md:!mt-16 lg:!mt-24 !mb-8 lg:!mb-16 gap-3"}>
                <Button
                    variant="secondary"
                    onClick={onPrevious}
                    disabled={onPrevious === undefined}
                    icon={<ArrowLeftIcon aria-hidden={true} />}
                    iconPosition={"left"}
                >
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
        </nav>
    );
};
