import * as React from "react";
import {PersonbeskyttelseFeilmelding} from "../sider/hovedmeny/PersonbeskyttelseFeilmelding";
import {NySoknadPanel} from "../sider/hovedmeny/paneler/NySoknad";
import {PabegynteSoknaderPanel} from "../sider/hovedmeny/paneler/PabegynteSoknader";
import {EttersendDokuPanel} from "../sider/hovedmeny/paneler/EttersendDokuPanel";
import {getSessionInfo} from "../generated/informasjon-ressurs/informasjon-ressurs";
import {NedetidPanel} from "../lib/components/NedetidPanel";
import {AppHeader} from "../lib/components/appHeader/AppHeader";

export async function Page() {
    const {userBlocked, open} = await getSessionInfo();

    return userBlocked ? (
        <PersonbeskyttelseFeilmelding />
    ) : (
        <div className={"bg-digisosGronnBakgrunn grow"}>
            <NedetidPanel varselType={"infoside"} />
            <div className="max-w-lg lg:max-w-3xl w-full mx-auto gap-6 max-lg:px-2 py-6 lg:gap-16 lg:py-16 flex flex-col grow">
                <AppHeader className={"bg-transparent lg:!text-heading-xlarge !w-full !p-0 !text-left"} />
                <div className={"space-y-5"}>
                    <NySoknadPanel defaultOpen={open?.length === 0} />
                    <PabegynteSoknaderPanel />
                    <EttersendDokuPanel />
                </div>
            </div>
        </div>
    );
}
export default Page;
