import {combineReducers} from "redux";
import {baseNftReducer} from "./baseNftReducer";
import {userNftReducer} from "./userNftReducer";


export const rootReducer = combineReducers({
    nft: baseNftReducer,
    userNft: userNftReducer,
})

export type RootState = ReturnType<typeof rootReducer>