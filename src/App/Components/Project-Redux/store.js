import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import appReducers from "./allReducers";
import {thunk} from "redux-thunk";

const store =  createStore(appReducers , composeWithDevTools(applyMiddleware(thunk)))

export default store;