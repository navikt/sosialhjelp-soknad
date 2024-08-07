import {Suspense} from "react";
import {ValideringsContextProvider} from "./lib/valideringContextProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {RouterProvider} from "react-router-dom";
import {ApplicationSpinner} from "./lib/components/animasjoner/ApplicationSpinner";
import {router} from "./routes";

const queryClient = new QueryClient();

export default function App() {
    return (
        <Suspense fallback={<ApplicationSpinner />}>
            <ValideringsContextProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ValideringsContextProvider>
        </Suspense>
    );
}
