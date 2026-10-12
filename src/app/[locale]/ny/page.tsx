import {Heading} from "@navikt/ds-react";
import {useTranslations} from "next-intl";
import {NySoknadInfo} from "../../../sider/hovedmeny/nySoknad/NySoknadInfo";

const Page = () => {
    return (
        <main aria-labelledby={"app-heading"}>
            <div
                className="max-w-lg lg:max-w-3xl w-full mx-auto gap-6 p-3 py-6 lg:gap-16 lg:py-16 flex flex-col grow"
                role={"none"}
            >
                <Heading id="nysoknad-heading" className={"text-center"} level={"1"} size={"large"}>
                    {useTranslations("NySoknadPanel")("title")}
                </Heading>
                <NySoknadInfo />
            </div>
        </main>
    );
};

export default Page;
