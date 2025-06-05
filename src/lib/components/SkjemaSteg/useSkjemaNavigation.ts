import {useNavigate} from "react-router";
import {useValideringContext} from "../../providers/useValideringContext.ts";
import {logAmplitudeEvent} from "../../amplitude/Amplitude";
import {useCurrentSoknadIsKort} from "./useCurrentSoknadIsKort.tsx";

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

    /**
     * Handles navigation between steps.
     * Prevents navigation in the forward direction if validation error present.
     * Logs event to Amplitude on successful navigation.
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

        await logAmplitudeEvent("skjemasteg fullført", {steg});
        //window.umami.trackEvent((props) => ({...props, steg: steg, isKortSoknad: useCurrentSoknadIsKort()}));
        window.umami.track("Skjemasteg fullført", {
            steg: steg,
            isKortSoknad: isKortSoknad,
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
