import { nftAction, nftActionTypes } from "../types/baseNft";
import { Dispatch } from "redux";
import { notification } from "antd";
import axios from "axios";
import { fetchUserNfts } from "./usernft";

export const fetchBaseNfts = () => {
  return async (dispatch: Dispatch<nftAction>) => {
    try {
      dispatch({ type: nftActionTypes.FETCH_Base_NFT });
      const response = await axios.get("http://localhost:8080/iceberg/basenft");
      setTimeout(() => {
        dispatch({
          type: nftActionTypes.FETCH_Base_NFT_SUCCESS,
          payload: response.data.data,
        });
      }, 500);
    } catch (e) {
      dispatch({
        type: nftActionTypes.FFETCH_Base_NFT_ERROR,
        payload: "Произошла ошибка при загрузке пользователей",
      });
    }
  };
};

export const createAndUpdate = (reqData: any) => {
  return async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/iceberg/cunft",
        reqData
      );
      if (response.data.code === 202) {
        await notification["success"]({
          message: "Update Success!",
          description: "The NFT updated successfully!",
        });
        await fetchUserNfts();
      } else if (response.data.code === 201) {
        await notification["success"]({
          message: "Create Success!",
          description: "The NFT created successfully!",
        });
        await fetchUserNfts();
      } else {
        await notification["error"]({
          message: "Server Error!",
          description: "Server Error!",
        });
      }
    } catch (e) {
      await notification["error"]({
        message: "Server Error!",
        description: "Server Error!",
      });
    }
  };
};
