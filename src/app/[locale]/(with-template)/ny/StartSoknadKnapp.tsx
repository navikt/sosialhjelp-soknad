import {ArrowRightIcon} from "@navikt/aksel-icons";
import {BodyLong, Button, Checkbox, ErrorMessage, InlineMessage, Link, Loader} from "@navikt/ds-react";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {useState, useTransition} from "react";
import {useCreateSoknad} from "../../../../generated";
import {umamiTrack} from "../../../umami";
import {SoknadstypeValg} from "../../../../sider/hovedmeny/nySoknad/SoknadstypeValg";

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
    const [soknadstype, setSoknadstype] = useState<"kort" | "standard" | undefined>(undefined);
    const [checked, setChecked] = useState(false);
    const [validate, setValidate] = useState(false);

    return (
        <>
            <div>
                <BodyLong className="mb-4">
                    {t.rich("bekreftelse.tekst", {
                        a: (chuncks) => (
                            <Link
                                href="https://www.nav.no/endringer"
                                inlineText
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {chuncks}
                            </Link>
                        ),
                    })}
                </BodyLong>
                <Checkbox onChange={(e) => setChecked(e.target.checked)} error={validate && !checked}>
                    {t("bekreftelse.checkboxLabel")}
                </Checkbox>
                {validate && !checked && (
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
                    setValidate(true);
                    if (checked) {
                        mutate({params: {soknadstype}});
                    }
                }}
            >
                {t("bekreftelse.button")}
            </Button>
            <SoknadstypeValg valg={soknadstype} setValg={setSoknadstype} />
        </>
    );
};

export default StartSoknadKnapp;
