import {combineReducers} from "redux";
import {baseNftReducer} from "./baseNftReducer";


export const rootReducer = combineReducers({
    nft: baseNftReducer,
})

export type RootState = ReturnType<typeof rootReducer>