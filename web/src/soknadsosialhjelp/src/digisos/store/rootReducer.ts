import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import LedeteksterReducer from "../saga/ledetekster/ledeteksterReducer";

export default (history: any) => combineReducers({
    router: connectRouter(history),
    ledetekster: LedeteksterReducer,
});
