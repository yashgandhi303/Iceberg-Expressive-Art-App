export interface loadingState {
  loading: boolean;
}
export enum dataLoadingTypes {
  dataLoadingSuccess = "Loadingsucess",
  dataLoadingFail = "LoadingFail",
}
interface LoadingSuccessAction {
  type: dataLoadingTypes.dataLoadingSuccess;
}
interface LoadingEndAction {
  type: dataLoadingTypes.dataLoadingFail;
}
export type loadingAction = LoadingSuccessAction | LoadingEndAction;
