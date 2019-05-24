import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { hentTekster } from "../../saga/ledetekster/ledeteksterActions";

type Props = DispatchProp;

class InformasjonView extends React.Component<Props, {}> {

    componentDidMount() {
        this.props.dispatch(hentTekster());
    }

    render() {
        return (
            <div className="informasjon">
                <h1>Informasjon</h1>
                <div className="redBorder">Får jeg en rød ramme rundt denne så er ALL GOOD.</div>
            </div>
        );
    }
}

export {InformasjonView};

export default connect((state: any) => {
    return {

    };
})(InformasjonView);
