import {useSelector} from "react-redux";
import {State} from "../reducers";

// Convenience function because so many of our useSelector calls just get state.soknadsdata
export const useSoknadsdata = () => useSelector((state: State) => state.soknadsdata);
