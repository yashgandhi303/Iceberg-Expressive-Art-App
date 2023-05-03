import React, { useState } from "react";
import { Button, Divider, Input, notification } from "antd";
import axios from "axios";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import "../../styles/style.css";

function Nft(prop: any) {
  const { fetchUserNfts } = useActions();
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

    let baseinfo = info
      .split(" ")
      .filter((x: any) => x && x !== " ")
      .map((x: any) => x.trim());
    let finalinfo = temp.join(" ");

    let count = 0;
    let templeave: string | string[] = [];
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
    console.log(count);
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
        // await dispatch({ type: dataLoadingTypes.dataLoadingSuccess });
      } else if (res.data.code === 201) {
        api["success"]({
          message: "Create Success!",
          description: "The NFT created successfully!",
        });
        await fetchUserNfts();
        // await dispatch({ type: dataLoadingTypes.dataLoadingSuccess });
      } else {
        // await dispatch({ type: dataLoadingTypes.dataLoadingSuccess });
        api["error"]({
          message: "Server Error!",
          description: "Server Error!",
        });
      }
    }
  };
  return (
    <div
      style={{
        borderRadius: "12px",
        backgroundColor: "#202427",
        borderStyle: "solid",
        borderColor: "grey",
        boxShadow: "2px 4px #888888",
        padding: "8px",
      }}
      onMouseEnter={() => setHover(info)}
      onMouseLeave={() => setLeave()}
    >
      {contextHolder}
      <div>
        <p
          style={{
            fontSize: "14px",
            textAlign: "center",
            paddingTop: "8px",
            fontWeight: "bold",
            color: '#95dbd5'
          }}
        >
          {name}
        </p>
      </div>
      <Divider type="horizontal" style={{ marginTop: "-4px" }}></Divider>
      <div
        style={{
          marginTop: "-12px",
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
      >
        <img src={image} style={{ width: "100%", borderRadius: "8px" }}></img>
      </div>
      <div>
        <p
          style={{ fontSize: "12px", textAlign: "center", fontWeight: "bold", color: '#95dbd5' }}
        >
          {value}
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div
          style={{
            width: "80%",
            textAlign: "center",
          }}
        >
          {type === "edit" ? (
            <div className="Animation">
              <p
                style={{
                  whiteSpace: "nowrap",
                  width: "100%",
                  color: '#95dbd5'
                }}
              >
                {info}
              </p>
            </div>
          ) : (
            <Input
              disabled={!isHovering}
              style={{ fontSize: "12px", textAlign: "center", width: "100%", backgroundColor: '#202427', color: '#95dbd5' }}
              value={!isHovering ? info : editInfo}
              onChange={onChange}
            ></Input>
          )}
        </div>
      </div>
      {type === "create" ? (
        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <Button
            type="primary"
            style={{ textAlign: "center", color: '#95dbd5' ,backgroundColor: '#202931'}}
            onClick={() => createNFT(_id, name, image, value)}
          >
            create
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Nft;
