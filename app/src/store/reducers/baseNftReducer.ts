import {nftAction, nftActionTypes, nftState} from "../types/baseNft";

const initialState: nftState = {
    nft: [],
    loading: false,
    error: null
}

export const baseNftReducer = (state = initialState, action: nftAction): nftState => {
    switch (action.type) {
        case nftActionTypes.FETCH_Base_NFT:
            return {loading: true, error: null, nft: []}
        case nftActionTypes.FETCH_Base_NFT_SUCCESS:
            return {loading: false, error: null, nft: action.payload}
        case nftActionTypes.FFETCH_Base_NFT_ERROR:
            return {loading: false, error: action.payload, nft: []}
        default:
            return state
    }
}