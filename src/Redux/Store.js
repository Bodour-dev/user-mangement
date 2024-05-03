import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./Reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootreducer=combineReducers({user:UserReducer})
const userStore=configureStore({reducer:rootreducer,middleware:[thunk]})
export default userStore;