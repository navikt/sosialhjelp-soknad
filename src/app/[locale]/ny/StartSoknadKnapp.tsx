import {ArrowRightIcon} from "@navikt/aksel-icons";
import {BodyLong, Button, Checkbox, ErrorMessage, InlineMessage, Link, Loader} from "@navikt/ds-react";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {useState, useTransition} from "react";
import {useCreateSoknad} from "../../../generated";
import {umamiTrack} from "../../umami";

const StartSoknadKnapp = () => {
    const t = useTranslations("NySoknad");
    const router = useRouter();
    const [isTransitioning, startTransition] = useTransition();
    const {mutate, isPending, error} = useCreateSoknad({
        mutation: {
            onSuccess: async (data) => {
                startTransition(() => router.push(`/skjema/${data.soknadId}/1`));
                umamiTrack("Skjema startet");
            },
        },
    });
    const [checked, setChecked] = useState(false);
    const [checkboxError, setCheckboxError] = useState(false);

    return (
        <>
            <div>
                <BodyLong className="mb-4">
                    {t.rich("bekreftelse.tekst", {
                        a: (chuncks) => (
                            <Link
                                href="https://www.nav.no/personopplysninger-sosialhjelp"
                                inlineText
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {chuncks}
                            </Link>
                        ),
                    })}
                </BodyLong>
                <Checkbox onChange={(e) => setChecked(e.target.checked)} error={!!checkboxError}>
                    {t("bekreftelse.checkboxLabel")}
                </Checkbox>
                {checkboxError && (
                    <ErrorMessage className="font-normal ml-8" size="small" role="alert">
                        {t("bekreftelse.checkboxError")}
                    </ErrorMessage>
                )}
            </div>

            {error && (
                <InlineMessage status="error" role="alert">
                    {t("bekreftelse.feilet")}
                </InlineMessage>
            )}

            <Button
                variant="primary"
                iconPosition="right"
                icon={isTransitioning || isPending ? <Loader aria-hidden /> : <ArrowRightIcon aria-hidden />}
                disabled={isTransitioning || isPending}
                onClick={(event) => {
                    event.preventDefault();
                    if (checked) {
                        setCheckboxError(false);
                        mutate({});
                    } else {
                        setCheckboxError(true);
                    }
                }}
            >
                {t("bekreftelse.button")}
            </Button>
        </>
    );
};

export default StartSoknadKnapp;
