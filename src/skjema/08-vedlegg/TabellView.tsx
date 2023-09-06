import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import {useOpplysning} from "./useOpplysning";
import {VedleggFrontendMinusEtParTingSomTrengerAvklaring} from "../../lib/opplysninger";
import {OpplysningInputRad} from "./OpplysningInputRad";
import {useTranslation} from "react-i18next";

const OpplysningRadNy = ({onClick, label}: {onClick: () => void; label: string}) => (
    <li className={`pt-3 pb-4`}>
        <LinkButton onClick={onClick}>
            <span aria-hidden={true}>+ </span>
            {label}
        </LinkButton>
    </li>
);

const TabellView = ({opplysning}: {opplysning: VedleggFrontendMinusEtParTingSomTrengerAvklaring}) => {
    const {t} = useTranslation();
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
                {multirow && <OpplysningRadNy onClick={() => append({})} label={t(`${textKey}.leggtil`)} />}
            </ul>
            <p style={{fontSize: 16}}>{t(`${textKey}.vedlegg.sporsmal.tittel`)}</p>
        </form>
    );
};

export default TabellView;
