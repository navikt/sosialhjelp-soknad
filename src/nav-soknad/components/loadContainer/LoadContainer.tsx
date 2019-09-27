import React, {useEffect} from 'react'
import {sjekkAutentiseringOgTilgangOgHentRessurser} from "../../../digisos/redux/soknad/soknadActions";
import NavFrontendSpinner from "nav-frontend-spinner";
import ServerFeil from "../../containers/ServerFeil";
import {State} from "../../../digisos/redux/reducers";
import {connect} from "react-redux";
import {DispatchProps} from "../../../digisos/redux/reduxTypes";

interface OwnProps {
    showLargeSpinner: boolean,
    showServerFeil: boolean,
    children: React.ReactNode
}

type Props = OwnProps & DispatchProps

const LoadContainer: React.FC<Props> = (props: Props) => {

    const {dispatch, showLargeSpinner, showServerFeil, children} = props;

    useEffect(() => {
        dispatch(sjekkAutentiseringOgTilgangOgHentRessurser());
    });

    if (showLargeSpinner){
        return (
            <div className="application-spinner">
                <NavFrontendSpinner type="XXL"/>
            </div>
        )
    }
    if (showServerFeil){
        return (<ServerFeil />)
    }

    return (
        <div>
            {children}
        </div>
    )
};


const mapStateToProps = (state: State) => {
    return {
        showLargeSpinner: state.soknad.showLargeSpinner,
        showServerFeil: state.soknad.showServerFeil
    };
};

export default connect(mapStateToProps)(LoadContainer);
