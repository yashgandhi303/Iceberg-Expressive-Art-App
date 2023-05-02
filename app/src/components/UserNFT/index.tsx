import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Row } from "antd";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { dataLoadingTypes } from "../../store/types/loading";
import { useActions } from "../../hooks/useActions";
import "../../styles/style.css";
import Nft from "../NFT";

function UserNFT() {
  const { userNft } = useTypedSelector((state) => state.userNft);
  const { loading } = useTypedSelector((state) => state.loading);
  const { fetchUserNfts } = useActions();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchdata = async () => {
      await dispatch({ type: dataLoadingTypes.dataLoadingSuccess });
      await fetchUserNfts();
      await dispatch({ type: dataLoadingTypes.dataLoadingFail });
    };
    fetchdata();
  }, []);

  console.log(loading);
  return !loading ? (
    <div
      style={{
        marginTop: " 8px",
        padding: "32px",
      }}
    >
      <div>
        <h2>UserNFT</h2>
      </div>
      <Row>
        {userNft
          ? userNft.map((value: any, key: any) => (
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
                  type="edit"
                />
              </Col>
            ))
          : ""}
      </Row>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Button type="link" href="/">
          <p style={{fontSize: "18px", fontWeight: 'bold'}}> {"< GoTo BaseNFT"}</p>
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default UserNFT;
