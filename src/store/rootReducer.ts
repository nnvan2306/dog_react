import { combineReducers } from "redux";
import { dogReducer } from "./dogSlice";

export const rootReducer = combineReducers({
    dog: dogReducer,
});
