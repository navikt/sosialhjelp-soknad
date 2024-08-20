import "../../index.css";
import "@navikt/ds-css";
import {ClientOnly} from "./client";

export function generateStaticParams() {
    return [{slug: [""]}];
}

function Page() {
    return <ClientOnly />;
}

export default Page;
