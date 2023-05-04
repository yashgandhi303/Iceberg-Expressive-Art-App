import { loadingAction, dataLoadingTypes, loadingState } from "../types/loading";

const initialState: loadingState = {
  loading: true,
}

export const LoadingReducer = (state = initialState, action: loadingAction): loadingState => {
  switch (action.type) {
    case dataLoadingTypes.dataLoadingSuccess:
      return { loading: true }
    case dataLoadingTypes.dataLoadingFail:
      return { loading: false }
    default:
      return state
  }
}