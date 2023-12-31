import React from "react";
import { Button, notification } from "antd";
import { useActions } from "../../hooks/useActions";

const splitString = (info: string) =>
  info
    .split(" ")
    .filter((x: string) => x && x !== " ")
    .map((x: string) => x.trim());

export const CreateBtn = ({ user, editInfo }: any) => {
  const { createAndUpdate } = useActions();
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
          count += 1;
        } else {
          templeave.push(x);
        }
      } else {
        count += 1;
      }
    }
    if (count > 10) {
      return api["error"]({
        message: "Cannot Creat NFT!!!",
        description: "The count of word should be less than 10",
      });
    } else {
      let reqData = {
        _id,
        name,
        image,
        value,
        info: finalinfo,
      };
      await createAndUpdate(reqData);
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
