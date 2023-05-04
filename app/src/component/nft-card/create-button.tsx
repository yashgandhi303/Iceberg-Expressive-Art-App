import axios from "axios";
import { Button, notification } from "antd";
import { useActions } from "../../hooks/useActions";

const splitString = (info: string) =>
  info
    .split(" ")
    .filter((x: string) => x && x !== " ")
    .map((x: string) => x.trim());

export const CreateBtn = ({ user, editInfo }: any) => {
  const { fetchUserNfts, createAndUpdate } = useActions();
  let { _id, name, image, value, info } = user;
  const [api, contextHolder] = notification.useNotification();

  const createNFT = async (_id: any, name: any, image: any, value: any) => {
    // if the user has given empty string
    if (!editInfo) {
      return api["error"]({
        message: "Cannot Creat NFT!!!",
        description: "The field cannot be empty.",
      });
    }

    let count = 0;
    let templeave: string | string[] = [];

    let temp = splitString(editInfo);
    let baseinfo = splitString(info);
    let finalinfo = temp.join(" ");

    // if the user has given the same input as original
    if (finalinfo === info) {
      api["error"]({
        message: "Cannot Creat NFT!!!",
        description: "The BaseNft Info Must be changed",
      });
      return;
    }

    for (let x of temp) {
      if (baseinfo.includes(x)) {
        if (templeave.includes(x)) {
          count = count + 1;
        } else {
          templeave.push(x);
        }
      } else {
        count = count + 1;
      }
    }
    if (count > 10) {
      return api["error"]({
        message: "Cannot Creat NFT!!!",
        description: "The count of word should be less than 10",
      });
    } else {
      let reqData = {
        _id: _id,
        name: name,
        image: image,
        value: value,
        info: finalinfo,
      };
      let res = await createAndUpdate(reqData);
      if (res.code === 202) {
        api["success"]({
          message: "Update Success!",
          description: "The NFT updated successfully!",
        });
        await fetchUserNfts();
      } else if (res.code === 201) {
        api["success"]({
          message: "Create Success!",
          description: "The NFT created successfully!",
        });
        await fetchUserNfts();
      } else {
        return api["error"]({
          message: "Server Error!",
          description: "Server Error!",
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        className="create_btn"
        onClick={() => createNFT(_id, name, image, value)}
      >
        create
      </Button>
    </>
  );
};
