import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

export default (history: any) => combineReducers({
    router: connectRouter(history)
});
