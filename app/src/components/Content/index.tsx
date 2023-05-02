import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Row } from "antd";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { dataLoadingTypes } from "../../store/types/loading";
import { useActions } from "../../hooks/useActions";
import "../../styles/style.css";
import Nft from "../NFT";

function Content() {
  const { nft } = useTypedSelector((state) => state.nft);
  const { loading } = useTypedSelector((state) => state.loading);
  const { fetchBaseNfts, fetchUserNfts } = useActions();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchdata = async () => {
      await dispatch({ type: dataLoadingTypes.dataLoadingFail });
      await fetchBaseNfts();
      await fetchUserNfts();
      await dispatch({ type: dataLoadingTypes.dataLoadingSuccess });
    };
    fetchdata();
  }, []);

  return loading ? (
    <div
      style={{
        marginTop: " 8px",
        padding: "32px",
      }}
    >
      <div>
        <h2>BaseNFT</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {nft
          ? nft.map((value: any, key: any) => (
              // <Card
              //   size="small"
              //   title={<p style={{ textAlign: "center" }}>{value.name}</p>}
              //   style={{ width: "16%", marginTop: "10px" }}
              //   key={key}
              // >
              //   <div>
              //     <img src={value.image} style={{ width: "100%" }}></img>
              //   </div>
              //   <p style={{ textAlign: "center" }}>{value.value}</p>
              //   <div style={{ textOverflow: "ellipsis" }}>
              //     <p
              //       style={{
              //         textAlign: "center",
              //         whiteSpace: "nowrap",
              //         width: "90%",
              //       }}
              //     >
              //       {value.info}
              //     </p>
              //   </div>
              // </Card>
              <Col span={4} style={{ padding: "8px" }}>
                <Nft
                  key={key}
                  _id={value._id}
                  image={value.image}
                  name={value.name}
                  value={value.value}
                  info={value.info}
                  type="create"
                />
              </Col>
            ))
          : ""}
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button type="link" href="/usernft">
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {" "}
            {"GoTo UserNFT >"}
          </p>
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Content;
