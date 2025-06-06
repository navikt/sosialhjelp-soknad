"use client";
import {useRouter} from "next/navigation";
import digisosConfig from "../../config.ts";
import {useEffect, useState} from "react";
import {logger} from "@navikt/next-logger";
import {getSessionInfo} from "../../../generated/informasjon-ressurs/informasjon-ressurs.ts";

type SessionResponse = {session: {active?: boolean}};

const {
    dekoratorLoginBaseUrl,
    dekorator: {dekoratorApiBaseUrl, logoutRedirectUrl},
} = digisosConfig;
const sessionUrl = `${dekoratorLoginBaseUrl}/oauth2/session`;
const loginUrl = `${dekoratorLoginBaseUrl}/oauth2/login`;
const authApiUrl = `${dekoratorApiBaseUrl}/auth`;

const useDecoratorLogin = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isEnabled = ["prod", "preprod", "dev"].includes(process.env.NEXT_PUBLIC_DIGISOS_ENV!);
    const redirectUrl = `${loginUrl}?redirect=${window.location.href}`;

    useEffect(() => {
        if (!isEnabled) return;

        setIsLoading(true);

        fetch(sessionUrl, {
            method: "get",
            credentials: "include",
        })
            .then((response) => {
                const {status} = response;
                if (status === 401) router.replace(redirectUrl);
                if (status === 200) {
                    response
                        .json()
                        .then(({session: {active}}: SessionResponse) => active === false && router.replace(redirectUrl))
                        .catch(logger.error);
                }
                // Sjekk at brukerId fra dekorator session matcher personId fra soknad session. Hvis ikke, logg brukeren ut av digisos-session
                Promise.all([fetch(authApiUrl, {method: "get"}), getSessionInfo()])
                    .then(([dekoratorSession, soknadSession]) => {
                        if (!dekoratorSession.ok) {
                            logger.error(
                                `Failed to fetch dekorator session from ${authApiUrl}: ${dekoratorSession.status} ${dekoratorSession.statusText}`
                            );
                            return;
                        }
                        dekoratorSession.json().then(({userId}: {userId: string}) => {
                            if (userId !== soknadSession.personId) {
                                logger.warn(
                                    `Dekorator userId does not match soknad session personId. ${!userId ? "No userId from dekorator session" : ""}`
                                );
                                router.replace(logoutRedirectUrl ?? "");
                            }
                        });
                    })
                    .catch(logger.error);
            })
            .catch(logger.error)
            .finally(() => setIsLoading(false));
    }, [isEnabled]);

    return {isLoading};
};

export default useDecoratorLogin;
