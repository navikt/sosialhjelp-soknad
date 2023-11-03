import {LinkButton} from "../../lib/components/linkButton/LinkButton";
import {useOpplysning} from "./useOpplysning";
import {OpplysningInputRad} from "./OpplysningInputRad";
import {useTranslation} from "react-i18next";
import {VedleggFrontend} from "../../generated/model";
import {BodyShort} from "@navikt/ds-react";

export const TabellView = ({opplysning}: {opplysning: VedleggFrontend}) => {
    const {t, i18n} = useTranslation();
    const {
        textKey,
        multirow,
        inputs,
        form: {control},
        rows: {entries, append, remove},
    } = useOpplysning(opplysning);

    return (
        <form>
            <ul>
                {entries.map(({id}, index) => (
                    <OpplysningInputRad
                        key={id}
                        textKey={textKey}
                        index={index}
                        control={control}
                        fields={inputs}
                        onDelete={index > 0 ? remove : undefined}
                    />
                ))}
                {multirow && (
                    <li className={`pt-3 pb-4`}>
                        <LinkButton onClick={() => append({})}>
                            <span aria-hidden={true}>+ </span>
                            {t(`${textKey}.leggtil`)}
                        </LinkButton>
                    </li>
                )}
            </ul>
            {i18n.exists(`${textKey}.vedlegg.sporsmal.tittel`) && (
                <BodyShort size={"small"}>{t(`${textKey}.vedlegg.sporsmal.tittel`)}</BodyShort>
            )}
        </form>
    );
};
