import {useSelector} from "react-redux";
import {State} from "../reducers";

// Convenience function because so many of our useSelector calls just get state.soknad
export const useSoknad = () => useSelector((state: State) => state.soknad);
