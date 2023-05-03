import React, { useState } from "react";
import { Button, Divider, Input, notification } from "antd";
import axios from "axios";
import { useActions } from "../hooks/useActions";
import "../styles/nft-card.css";

const splitString = (info: string) => info.split(" ")
.filter((x: string) => x && x !== " ")
.map((x: string) => x.trim());

export const NFTCard = ({
  key,
  user,
  type,
  children,
  ...props
}: any) => {
  const { fetchUserNfts } = useActions();
  let { _id, name, image, value, info } = user;

  const [isHovering, setIsHovering] = useState(false);
  const [editInfo, setEditInfo] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const setHover = (info: any) => {
    setIsHovering(true);
    setEditInfo(info);
  };
  const setLeave = () => setIsHovering(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setEditInfo(e.target.value);

  const createNFT = async (_id: any, name: any, image: any, value: any) => {
    if (!editInfo) {
      api["error"]({
        message: "Cannot Creat NFT!!!",
        description: "The field cannot be empty.",
      });
    }
    let count = 0;
    let templeave: string | string[] = [];

    let temp = splitString(editInfo)
    let baseinfo = splitString(info)
    let finalinfo = temp.join(" ");

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
      api["error"]({
        message: "Cannot Creat NFT!!!",
        description: "The count of word is less than 10",
      });
    } else if (finalinfo === info) {
      api["error"]({
        message: "Cannot Creat NFT!!!",
        description: "The BaseNft Info Must be changed",
      });
    } else {
      let res = await axios.post("http://localhost:8080/iceberg/cunft", {
        _id: _id,
        name: name,
        image: image,
        value: value,
        info: finalinfo,
      });
      if (res.data.code === 202) {
        api["success"]({
          message: "Update Success!",
          description: "The NFT updated successfully!",
        });
        await fetchUserNfts();
      } else if (res.data.code === 201) {
        api["success"]({
          message: "Create Success!",
          description: "The NFT created successfully!",
        });
        await fetchUserNfts();
      } else {
        api["error"]({
          message: "Server Error!",
          description: "Server Error!",
        });
      }
    }
  };

  return (
    <div className="shared_card"
      onMouseEnter={() => setHover(info)}
      onMouseLeave={() => setLeave()}
    >
      {contextHolder}
      <div>
        <p className="title">{name}</p>
      </div>
      <Divider type="horizontal" className="m-t--4"></Divider>
      <div className="box">
        <img src={image} alt={image}></img>
      </div>
      <div>
        <p className="value">{value}</p>
      </div>
      <div className="d-flex justify-space-around">
        <div className="w-80 text-center">
          {type === "edit" ? (
            <div>
              <p className="primary-color">{info}</p>
            </div>
          ) : (
            <Input
              className="custom-input"
              disabled={!isHovering}
              value={!isHovering ? info : editInfo}
              onChange={onChange}
            ></Input>
          )}
        </div>
      </div>
      {type === "create" && isHovering ? (
        <div className="m-t-8 text-center action_btn">
          <Button
            type="primary"
            className="create_btn"
            onClick={() => createNFT(_id, name, image, value)}
          >
            create
          </Button>
        </div>
      ) : ( null )}
    </div>
  );
}
