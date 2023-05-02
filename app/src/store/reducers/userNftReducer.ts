import {userNftAction, userNftActionTypes, userNftState} from "../types/userNft";

const initialState: userNftState = {
    userNft: [],
    loading: false,
    error: null
}

export const userNftReducer = (state = initialState, action: userNftAction): userNftState => {
    switch (action.type) {
        case userNftActionTypes.FETCH_User_NFT:
            return {loading: true, error: null, userNft: []}
        case userNftActionTypes.FETCH_User_NFT_SUCCESS:
            return {loading: false, error: null, userNft: action.payload}
        case userNftActionTypes.FETCH_User_NFT_ERROR:
            return {loading: false, error: action.payload, userNft: []}
        default:
            return state
    }
}