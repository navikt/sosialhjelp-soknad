declare module "react-lottie" {
    /**
     * @param loop if the animation must be continue after the animation has fully executed
     * @param autoplay if the animation needs to be started when the react component requests rendering
     * @param animationData require here the animation data in format JSON
     * @param rendererSettings
     */
    interface LottieBodymovinOptionProps {
        loop?: boolean;
        autoplay?: boolean;
        animationData: any;
        rendererSettings?: {
            preserveAspectRatio?: any;
            context?: any; // the canvas context
            scaleMode?: "noScale" | any;
            clearCanvas?: boolean;
            progressiveLoad?: boolean; // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
            hideOnTransparent?: boolean; //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
            className?: string;
        };
    }

    /**
     * @param eventName the event sent by bodymovin
     * @param callback a callback execute when this eventName is received.
     */
    interface BodymovinEvent {
        eventName:
            | "complete"
            | "loopComplete"
            | "enterFrame"
            | "segmentStart"
            | "config_ready"
            | "data_ready"
            | "loaded_images"
            | "DOMLoaded"
            | "destroy";
        callback: () => void;
    }

    /**
     * Props of Lottie component
     * @param options the object representing the animation settings that will be instantiated by bodymovin.
     * @param height height size of the animation in pixel, default value is 100%
     * @param width width size of the animation in pixel, default value is 100%
     * @param isStopped must be stocked in a state, boolean that describe if the animation must be in stopped mode
     * @param isPaused must be stocked in a state, boolean that describe if the animation must be in paused mode
     * @param eventListeners optional [default: []], This is an array of objects containing a eventName and callback function that will be registered as eventlisteners on the animation object. refer to bodymovin#events where the mention using addEventListener, for a list of available custom events.
     */
    interface LottiePropsType {
        options: LottieBodymovinOptionProps;
        height?: number | string;
        width?: number | string;
        isStopped: boolean;
        isPaused: boolean;
        eventListeners?: Array<BodymovinEvent>;
        segments?: Array<number>;
        speed?: number | 1;
        direction?: number;
        ariaRole?: string | "button";
        ariaLabel?: string | "animation";
        isClickToPauseDisabled?: boolean;
        title?: string;
    }
    /**
     * @component Lottie is a component that allow you to use animation from JSON file that created by
     * Bodymovin on Adobe After Effect
     */
    export default class Lottie extends React.Component<LottiePropsType, any> {}
}
