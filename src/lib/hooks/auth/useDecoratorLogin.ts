"use client";
import {useRouter} from "next/navigation";
import digisosConfig from "../../config.ts";
import {useEffect, useState} from "react";
import {logger} from "@navikt/next-logger";

type SessionResponse = {session: {active?: boolean}};

const {dekoratorLoginBaseUrl} = digisosConfig;
const sessionUrl = `${dekoratorLoginBaseUrl}/oauth2/session`;
const loginUrl = `${dekoratorLoginBaseUrl}/oauth2/login`;

const useDecoratorLogin = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isEnabled = ["prod", "preprod"].includes(process.env.NEXT_PUBLIC_DIGISOS_ENV!);
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
                if (status === 200)
                    response
                        .json()
                        .then(({session: {active}}: SessionResponse) => active === false && router.replace(redirectUrl))
                        .catch(logger.error);
            })
            .catch(logger.error)
            .finally(() => setIsLoading(false));
    }, [isEnabled]);

    return {isLoading};
};

export default useDecoratorLogin;
