import {LinkButton} from "../../nav-soknad/components/linkButton/LinkButton";
import {useOpplysning} from "./useOpplysning";
import {VedleggFrontendMinusEtParTingSomTrengerAvklaring} from "../../lib/opplysninger";
import {OpplysningInputRad} from "./OpplysningInputRad";
import {useTranslation} from "react-i18next";

const AddRowButton = ({onClick, textKey}: {onClick: () => void; textKey: string}) => {
    const {t} = useTranslation();
    const undertekstKey = `${textKey}.leggtil`;

    return (
        <div className={`pt-3 pb-4`}>
            <LinkButton onClick={onClick}>
                <span aria-hidden={true}>+ </span>
                {t(undertekstKey)}
            </LinkButton>
        </div>
    );
};

const TabellView = ({opplysning}: {opplysning: VedleggFrontendMinusEtParTingSomTrengerAvklaring}) => {
    const {t} = useTranslation();
    const {
        textKey,
        numRows,
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
                {numRows === "flere" && (
                    <li>
                        <AddRowButton onClick={() => append({})} textKey={textKey} />
                    </li>
                )}
            </ul>
            <p style={{fontSize: 16}}>{t(`${textKey}.vedlegg.sporsmal.tittel`)}</p>
        </form>
    );
};

export default TabellView;
