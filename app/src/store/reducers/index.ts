import { combineReducers } from "redux";
import { baseNftReducer } from "./baseNftReducer";
import { LoadingReducer } from "./loadingReducer";
import { userNftReducer } from "./userNftReducer";
// import { dataLoadingTypes } from "../types/loading";

export const rootReducer = combineReducers({
  nft: baseNftReducer,
  userNft: userNftReducer,
  loading: LoadingReducer
})

export type RootState = ReturnType<typeof rootReducer>