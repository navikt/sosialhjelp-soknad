import {useLocation} from "react-router";

export const useCurrentSoknadIsKort = () => useLocation().pathname.includes("/kort");
