import { userNftAction,  userNftActionTypes} from "../types/userNft";
import { Dispatch } from "redux";
import axios from "axios";

export const fetchUserNfts = () => {
  return async (dispatch: Dispatch<userNftAction>) => {
    try {
      dispatch({ type: userNftActionTypes.FETCH_User_NFT });
      const response = await axios.get(
       'http://localhost:8080/iceberg/getUserNft'
      );
      setTimeout(() => {
        dispatch({
          type: userNftActionTypes.FETCH_User_NFT_SUCCESS,
          payload: response.data.data,
        });
      }, 500);
    } catch (e) {
      dispatch({
        type: userNftActionTypes.FETCH_User_NFT_ERROR,
        payload: "couldn't fetch user",
      });
    }
  };
};
