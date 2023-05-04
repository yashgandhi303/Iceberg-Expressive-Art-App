import { nftAction, nftActionTypes } from "../types/baseNft";
import { Dispatch } from "redux";
import axios from "axios";

export const fetchBaseNfts = () => {
  return async (dispatch: Dispatch<nftAction>) => {
    try {
      dispatch({ type: nftActionTypes.FETCH_Base_NFT });
      const response = await axios.get("http://localhost:8080/iceberg/getBaseNft");
      setTimeout(() => {
        dispatch({
          type: nftActionTypes.FETCH_Base_NFT_SUCCESS,
          payload: response.data.data,
        });
      }, 500);
    } catch (e) {
      dispatch({
        type: nftActionTypes.FFETCH_Base_NFT_ERROR,
        payload: "couldn't fetch user",
      });
    }
  };
};
