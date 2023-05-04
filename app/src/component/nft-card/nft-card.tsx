import { useState } from "react";
import { Divider, Input } from "antd";
import "../../styles/nft-card.css";
import { CreateBtn } from "./create-button";

const { TextArea } = Input;

export const NFTCard = ({ key, user, type }: any) => {
  const [isHovering, setIsHovering] = useState(false);
  const [editInfo, setEditInfo] = useState("");
  
  let { name, image, value, info } = user;

  const setHover = (info: any) => {
    setIsHovering(true);
    setEditInfo(info);
  };

  return (
    <div className="shared_card"
      onMouseEnter={() => setHover(info)}
      onMouseLeave={() => setIsHovering(false)}
    >
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
            <TextArea
              autoSize={{ maxRows: 3 }}
              disabled={!isHovering}
              className="custom-input"
              value={!isHovering ? info : editInfo}
              onChange={(e) => setEditInfo(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className={`m-t-8 text-center ${type === "create" ? 'action_btn' : 'hide'}`}>
        <CreateBtn user={user} editInfo={editInfo} />
      </div>
    </div>
  );
}
