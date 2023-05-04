import axios from "axios";
import { notification } from "antd";
import { fetchUserNfts } from "./user-nft";

export const createAndUpdate = (reqData: any) => {
  return async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/iceberg/createUserNft",
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