import react, { useEffect } from "react";
import { Col, Row, Card, Space } from "antd";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import "../../styles/style.css";
import Nft from "../NFT";

function Content() {
  const { nft, loading, error } = useTypedSelector((state) => state.nft);
  const { fetchBaseNfts } = useActions();
  useEffect(() => {
    fetchBaseNfts();
  }, []);
  return (
    <div
      style={{
        marginTop: " 50px",
        padding: "20px",
      }}
    >
      <div>
        <h2 style={{ color: "white" }}>BaseNFT</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {nft
          ? nft.map((value: any, key: any) => (
              <Card
                size="small"
                title={<p style={{ textAlign: "center" }}>{value.name}</p>}
                style={{ width: "16%", marginTop: "10px" }}
                key={key}
              >
                <div>
                  <img src={value.image} style={{ width: "100%" }}></img>
                </div>
                <p style={{ textAlign: "center" }}>{value.value}</p>
                <div style={{ textOverflow: "ellipsis" }}>
                  <p
                    style={{
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      width: "90%",
                    }}
                  >
                    {value.info}
                  </p>
                </div>
              </Card>
              // <Col span={4}>
              //   <Nft
              //     key={key}
              //     image={value.image}
              //     name={value.name}
              //     value={value.value}
              //     info={value.info}
              //   />
              // </Col>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Content;
