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
        padding: "0px 32px 0px 32px",
        minWidth: "320px",
      }}
    >
      <div>
        <h2 style={{color: '#95dbd5', padding: '8px'}}>BaseNFT</h2>
      </div>
      <Row>
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
              <Col xl={4} md={8} lg={6} sm={12} style={{ padding: "8px" }}>
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
      </Row>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: '12px' }}>
        <Button type="link" href="/usernft">
          <span style={{ fontSize: "18px", fontWeight: "bold", color: "#95dbd5" }}>
            {"GoTo UserNFT >"}
          </span>
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Content;
