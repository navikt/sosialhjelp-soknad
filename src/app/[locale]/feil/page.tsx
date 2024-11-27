"use client";

import TekniskFeil from "../../../sider/feilsider/TekniskFeil.tsx";

const page = () => <TekniskFeil error={new Error("fra /feil")} />;

export default page;
