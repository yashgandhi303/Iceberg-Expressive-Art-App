import React, { useState } from "react";
import { Button, Divider, notification } from "antd";
import axios from "axios";
import { useActions } from "../../hooks/useActions";
function Nft(prop: any) {
  const { fetchBaseNfts, fetchUserNfts } = useActions();
  let { _id, name, image, value, info, type } = prop;

  const [isHovering, setIsHovering] = useState(false);
  const [editInfo, setEditInfo] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const setHover = (info: any) => {
    setIsHovering(true);
    setEditInfo(info);
  };
  const setLeave = () => {
    setIsHovering(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInfo(e.target.value);
  };

  const createNFT = async (_id: any, name: any, image: any, value: any) => {
    let temp = editInfo
      .split(" ")
      .filter((x) => x && x !== " ")
      .map((x) => x.trim());
    let finalinfo = temp.join(" ");

    if (temp.length > 10) {
      api["error"]({
        message: "Cannot Creat NFT!!!",
        description: "The count of word is less than 10 and T",
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
        await fetchBaseNfts();
        await fetchUserNfts();
      }
      if (res.data.code === 201) {
        api["success"]({
          message: "Create Success!",
          description: "The NFT created successfully!",
        });
        await fetchBaseNfts();
        await fetchUserNfts();
      }
    }
  };
  return (
    <div
      style={{
        width: "260px",
        borderRadius: "12px",
        backgroundColor: "white",
        borderStyle: "solid",
        borderColor: "grey",
        boxShadow: "2px 4px #888888",
        height: "410px",
      }}
      onMouseEnter={() => setHover(info)}
      onMouseLeave={() => setLeave()}
    >
      {contextHolder}
      <div>
        <p
          style={{
            fontSize: "12px",
            textAlign: "center",
            paddingTop: "8px",
            fontWeight: "bold",
          }}
        >
          {name}
        </p>
      </div>
      <Divider type="horizontal" style={{ marginTop: "-4px" }}></Divider>
      <div
        style={{ marginTop: "-12px", paddingLeft: "8px", paddingRight: "8px" }}
      >
        <img src={image} style={{ width: "100%", borderRadius: "8px" }}></img>
      </div>
      <div>
        <p style={{ fontSize: "12px", textAlign: "center" }}>{value}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "80%",
            textAlign: "center",
          }}
        >
          <input
            disabled={!isHovering}
            style={{ fontSize: "12px", textAlign: "center", width: "100%" }}
            value={!isHovering ? info : editInfo}
            onChange={onChange}
          ></input>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "8px" }}>
        <Button
          type="primary"
          style={{ textAlign: "center" }}
          onClick={() => createNFT(_id, name, image, value)}
        >
          {type === "create" ? "create" : "edit"}
        </Button>
      </div>
    </div>
  );
}

export default Nft;
