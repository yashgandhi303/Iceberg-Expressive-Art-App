export interface userNftState {
  userNft: any[];
  loading: boolean;
  error: null | string;
}
export enum userNftActionTypes {
  FETCH_User_NFT = 'FETCH_User_NFT',
  FETCH_User_NFT_SUCCESS = 'FETCH_User_NFT_SUCCESS',
  FETCH_User_NFT_ERROR = 'FETCH_User_NFT_ERROR',
}
interface FetchUserNftsAction {
  type: userNftActionTypes.FETCH_User_NFT;
}
interface FetchUserNftsSuccessAction {
  type: userNftActionTypes.FETCH_User_NFT_SUCCESS;
  payload: any[]
}
interface FetchUserNftsErrorAction {
  type: userNftActionTypes.FETCH_User_NFT_ERROR;
  payload: string;
}
export type userNftAction = FetchUserNftsAction | FetchUserNftsSuccessAction | FetchUserNftsErrorAction