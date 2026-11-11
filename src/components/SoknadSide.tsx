import {VStack} from "@navikt/ds-react";
import {ReactNode} from "react";
import {SoknadHeader} from "./SoknadHeader";

interface Props {
    children: ReactNode;
    showCode?: boolean;
    labelledBy?: string;
}

/**
 * Felles ramme for sidene i søknaden: main, header, bredde og avstand.
 * TODO: Flyttes til layout når alle sider er skrevet over til next-routing.
 *
 * id="maincontent" og tabIndex={-1} gjør at dekoratøren viser sin skip-lenke og kan flytte fokus hit.
 */
export const SoknadSide = ({children, showCode = true, labelledBy}: Props) => (
    <VStack
        as="main"
        id="maincontent"
        tabIndex={-1}
        aria-labelledby={labelledBy}
        className="max-w-3xl w-full mx-auto grow p-3 py-6 lg:py-16 focus:outline-none"
    >
        <SoknadHeader showCode={showCode} />
        <VStack gap={{xs: "space-32", lg: "space-64"}}>{children}</VStack>
    </VStack>
);
