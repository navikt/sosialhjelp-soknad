import {useEffect, useRef, useState} from "react";

const useSlowProcessingWarning = (hasPendingOrProcessing?: boolean) => {
    const pendingSinceRef = useRef<number | null>(null);

    const [showProcessingWarning, setShowProcessingWarning] = useState(false);
    useEffect(() => {
        if (hasPendingOrProcessing) {
            if (pendingSinceRef.current === null) {
                pendingSinceRef.current = Date.now();
            }
            const elapsed = Date.now() - pendingSinceRef.current;
            const remaining = Math.max(0, 10_000 - elapsed);
            const timer = setTimeout(() => setShowProcessingWarning(true), remaining);
            return () => clearTimeout(timer);
        } else {
            pendingSinceRef.current = null;
            const timer = setTimeout(() => setShowProcessingWarning(false), 0);
            return () => clearTimeout(timer);
        }
    }, [hasPendingOrProcessing]);

    return showProcessingWarning;
};

export default useSlowProcessingWarning;
