import {ClientOnly} from "./client";

export function generateStaticParams() {
    return [{slug: [""]}];
}

function Page() {
    return <ClientOnly />;
}

export default Page;
