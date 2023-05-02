export interface nftState {
    nft: any[];
    loading: boolean;
    error: null | string;
}
export enum nftActionTypes {
    FETCH_Base_NFT = 'FETCH_Base_NFT',
    FETCH_Base_NFT_SUCCESS = 'FETCH_Base_NFT_SUCCESS',
    FFETCH_Base_NFT_ERROR = 'FFETCH_Base_NFT_ERROR',
}
interface FetchNftsAction {
    type: nftActionTypes.FETCH_Base_NFT;
}
interface FetchNftsSuccessAction {
    type: nftActionTypes.FETCH_Base_NFT_SUCCESS;
    payload: any[]
}
interface FetchNftsErrorAction {
    type: nftActionTypes.FFETCH_Base_NFT_ERROR;
    payload: string;
}
export type nftAction = FetchNftsAction | FetchNftsErrorAction | FetchNftsSuccessAction