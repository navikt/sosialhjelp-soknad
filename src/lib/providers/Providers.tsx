import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {DigisosContextProvider} from "./DigisosContextProvider.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
export const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <DigisosContextProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <div aria-hidden={"true"}>
                    <ReactQueryDevtools initialIsOpen={false} />
                </div>
            </QueryClientProvider>
        </DigisosContextProvider>
    );
};
