import {useNavigate} from "react-router";
import {useValideringContext} from "../../providers/useValideringContext.ts";
import {useCurrentSoknadIsKort} from "./useCurrentSoknadIsKort.tsx";
import {useSoknadId} from "../../hooks/common/useSoknadId.ts";

/**
 * Utility hook for handling navigation between steps, using error validation context.
 * @param steg Current step, number
 */
export const useSkjemaNavigation = (steg: number) => {
    const {
        state: {feil},
        dispatch,
    } = useValideringContext();
    const navigate = useNavigate();
    const isKortSoknad = useCurrentSoknadIsKort();
    const soknadId = useSoknadId();

    /**
     * Handles navigation between steps.
     * Prevents navigation in the forward direction if validation error present.
     *
     * @throws Error if trying to navigate back from first page
     * @param newPage New page number to navigate to
     */
    const handleStepChange = async (newPage: number) => {
        if (newPage == 0) throw new Error("Cannot go back from first page");

        if (newPage == steg) return;

        if (newPage < steg) {
            dispatch({type: "clearAllValideringsfeil"});
            navigate(`../${newPage}`);
            return;
        }

        if (feil.length) {
            dispatch({type: "visValideringsfeilPanel"});
            return;
        }

        window.umami.track("Skjemasteg fullført", {
            steg: steg.toString(),
            isKortSoknad: isKortSoknad,
            soknadId: soknadId,
        });
        dispatch({type: "clearAllValideringsfeil"});
        navigate(`../${newPage}`);
    };

    /** Convenience function for navigating to the previous step, calls handleStepChange */
    const handlePrevious = async () => await handleStepChange(steg - 1);
    /** Convenience function for navigating to the next step, calls handleStepChange */
    const handleNext = async () => await handleStepChange(steg + 1);

    return {
        handleStepChange,
        handlePrevious,
        handleNext,
    };
};
