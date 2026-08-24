"use client";
import {useRouter} from "next/navigation";
import digisosConfig from "../../config.ts";
import {useEffect, useState} from "react";
import getLogger from "@log/logger";
import {getSessionInfo} from "../../../generated/informasjon-ressurs/informasjon-ressurs.ts";

type SessionResponse = {session: {active?: boolean}};

const {
    dekoratorLoginBaseUrl,
    dekorator: {dekoratorApiBaseUrl, logoutRedirectUrl},
} = digisosConfig;
const sessionUrl = `${dekoratorLoginBaseUrl}/oauth2/session`;
const loginUrl = `${dekoratorLoginBaseUrl}/oauth2/login`;
const authApiUrl = `${dekoratorApiBaseUrl}/auth`;

export const handleSessionCheck = async (
    isEnabled: boolean,
    setIsLoading: (loading: boolean) => void,
    router: ReturnType<typeof useRouter>
) => {
    if (!isEnabled) return;
    const redirectUrl = `${loginUrl}?redirect=${window.location.href}`;

    setIsLoading(true);
    try {
        const response = await fetch(sessionUrl, {
            method: "get",
            credentials: "include",
        });

        const {status} = response;
        if (status === 401) {
            router.replace(redirectUrl);
            return;
        }

        if (status === 200) {
            try {
                const {
                    session: {active},
                }: SessionResponse = await response.json();
                if (active === false) {
                    router.replace(redirectUrl);
                    return;
                }
            } catch (error) {
                getLogger().error(error);
            }
            try {
                const [dekoratorSession, soknadSession] = await Promise.all([
                    fetch(authApiUrl, {method: "get", credentials: "include"}),
                    getSessionInfo(),
                ]);

                if (!dekoratorSession.ok) {
                    getLogger().error(
                        `Failed to fetch dekorator session from ${authApiUrl}: ${dekoratorSession.status} ${dekoratorSession.statusText}`
                    );
                    return;
                }
                const {userId}: {userId: string} = await dekoratorSession.json();
                if (userId !== soknadSession.personId) {
                    getLogger().warn(
                        `Dekorator userId does not match soknad session personId. ${!userId ? "No userId from dekorator session" : ""}`
                    );
                    router.replace(logoutRedirectUrl ?? "");
                    return;
                }
            } catch (error) {
                getLogger().error(error);
            }
        }
    } catch (error) {
        getLogger().error(error);
    } finally {
        setIsLoading(false);
    }
};

const useDecoratorLogin = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isEnabled = ["prod", "preprod", "dev"].includes(process.env.NEXT_PUBLIC_DIGISOS_ENV!);

    useEffect(() => {
        handleSessionCheck(isEnabled, setIsLoading, router);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEnabled]);

    return {isLoading};
};

export default useDecoratorLogin;
