import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ValideringsContextProvider} from "./ValideringContextProvider.tsx";
import {AnalyticsProvider} from "./AnalyticsContextProvider.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
export const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <ValideringsContextProvider>
            <QueryClientProvider client={queryClient}>
                <AnalyticsProvider>
                    {children}
                    <div aria-hidden={"true"}>
                        <ReactQueryDevtools initialIsOpen={false} />
                    </div>
                </AnalyticsProvider>
            </QueryClientProvider>
        </ValideringsContextProvider>
    );
};
