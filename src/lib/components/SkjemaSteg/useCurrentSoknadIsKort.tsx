import {useLocation} from "react-router-dom";

export const useCurrentSoknadIsKort = () => useLocation().pathname.includes("/kort");
