import {Button} from "@navikt/ds-react";
import * as React from "react";
import DOMPortal from "./DOMPortal";
import Utskrift from "./Utskrift";

export interface SkrivUtKnappProps {
    innholdRenderer: () => React.ReactNode;
    prerenderInnhold?: boolean;
}

export interface State {
    active: boolean;
}

function updateDocumentClass(active: boolean) {
    if (active) {
        document.documentElement.classList.add("js-utskriftsmodus");
    } else {
        document.documentElement.classList.remove("js-utskriftsmodus");
    }
}

class SkrivUtKnapp extends React.Component<SkrivUtKnappProps, State> {
    printTimeoutId: number | null = null;

    constructor(props: SkrivUtKnappProps) {
        super(props);
        this.print = this.print.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
            active: false,
        };
    }

    componentDidMount() {
        updateDocumentClass(this.state.active);
    }

    componentWillUnmount() {
        updateDocumentClass(false);
    }

    print() {
        window.print();
        this.printTimeoutId = null;
        setTimeout(this.reset, 10); // Tilbakestiller utskriftsmodus
    }

    reset() {
        this.setState({
            active: false,
        });
    }

    componentDidUpdate(prevProps: SkrivUtKnappProps, prevState: State) {
        updateDocumentClass(this.state.active);
        if (!prevState.active && this.state.active) {
            if (this.printTimeoutId) {
                clearTimeout(this.printTimeoutId);
            }
            setTimeout(this.print, 10);
        }
    }

    render() {
        return (
            <div>
                <Button
                    variant="secondary"
                    onClick={() =>
                        this.setState({
                            active: !this.state.active,
                        })
                    }
                >
                    {this.props.children}
                </Button>

                {this.props.prerenderInnhold || this.state.active ? (
                    <DOMPortal>
                        <Utskrift active={true}>{this.props.innholdRenderer()}</Utskrift>
                    </DOMPortal>
                ) : null}
            </div>
        );
    }
}

export default SkrivUtKnapp;
