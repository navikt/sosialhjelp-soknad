export {};

declare global {
    interface Window {
        umami: {
            trackEvent: (eventName: (props) => any, eventData?: Record<string, any>) => void;
            track: (eventName: string, eventData?: Record<string, any>) => void;
        };
    }
}
