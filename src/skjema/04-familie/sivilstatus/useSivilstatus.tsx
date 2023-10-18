import {Person, Status} from "./FamilieTypes";
import {useSoknadsdata} from "../../../digisos/redux/soknadsdata/useSoknadsdata";
import {SoknadsSti} from "../../../digisos/redux/soknadsdata/soknadsdataReducer";

const blankPerson: Person = {
    navn: {
        fornavn: "",
        mellomnavn: "",
        etternavn: "",
        fulltNavn: "",
    },
    fodselsdato: null,
    personnummer: null,
};

export const useSivilstatus = () => {
    const {
        soknadsdata: {familie},
        lagre,
        oppdater,
    } = useSoknadsdata(SoknadsSti.SIVILSTATUS);

    const sivilstatus = familie?.sivilstatus?.sivilstatus ?? null;

    const setSivilstatus = (nySivilstatus: Status) => {
        let sivilstatus = familie.sivilstatus;
        if (sivilstatus.sivilstatus === nySivilstatus) return;

        sivilstatus = {
            kildeErSystem: false,
            sivilstatus: nySivilstatus,
            ektefelle: nySivilstatus === Status.GIFT ? {...blankPerson} : undefined,
        };

        oppdater(sivilstatus);
        lagre(sivilstatus);
    };

    return {sivilstatus, setSivilstatus};
};
