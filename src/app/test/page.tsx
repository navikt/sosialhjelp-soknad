import {getSessionInfoSsr} from "../../generated/server/informasjon-ressurs/informasjon-ressurs";

export default async function Page() {
    const {open} = await getSessionInfoSsr();
    return (
        <div>
            <h1>Test</h1>
            <pre>{JSON.stringify(open)}</pre>
        </div>
    );
}
