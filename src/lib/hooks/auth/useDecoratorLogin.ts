"use client";
import {useRouter} from "next/navigation";
import digisosConfig from "../../config.ts";
import {useEffect, useState} from "react";
import {logger} from "@navikt/next-logger";

const sessionUrl = digisosConfig.dekoratorLoginBaseUrl + "/oauth2/session";
const loginUrl = digisosConfig.dekoratorLoginBaseUrl + "/oauth2/login";

const useDecoratorLogin = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        try {
            fetch(sessionUrl, {
                method: "get",
                credentials: "include",
            }).then((response) => {
                const status = response.status;
                if (status === 401) {
                    return router.replace(loginUrl + "?redirect=" + window.location.href);
                }
                if (status === 200) {
                    try {
                        response.json().then((data: {session: {active: boolean}}) => {
                            if (data.session.active === false) {
                                router.replace(loginUrl + "?redirect=" + window.location.href);
                            }
                        });
                    } catch (e) {
                        logger.error(e);
                    }
                }
            });
        } catch (e) {
            logger.error(e);
        }
        setIsLoading(false);
    }, []);
    return isLoading;
};

export default useDecoratorLogin;
