import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Row } from "antd";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { dataLoadingTypes } from "../../store/types/loading";
import { useActions } from "../../hooks/useActions";
import isEmpty from "../utils/isEmpty";
import "../../styles/style.css";
import Nft from "../NFT";
import { CChart } from "@coreui/react-chartjs";

function UserNFT() {
  const { userNft } = useTypedSelector((state) => state.userNft);
  const { nft } = useTypedSelector((state) => state.nft);
  const { loading } = useTypedSelector((state) => state.loading);
  const [chatname, setChartName] = useState([]);
  const [chartBaseNft, setChartBaseNft] = useState([]);
  const [userChartNft, setUserChartNft] = useState([]);
  const { fetchUserNfts, fetchBaseNfts } = useActions();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchdata = async () => {
      await dispatch({ type: dataLoadingTypes.dataLoadingSuccess });
      await fetchUserNfts();
      await fetchBaseNfts();
      await dispatch({ type: dataLoadingTypes.dataLoadingFail });

      setChartData();
    };
    fetchdata();
  }, []);

  useEffect(() => {
    if (nft.length !== 0 && userNft.length !== 0) {
      setChartData();
    }
  }, [nft, userNft]);

  const setChartData = () => {
    let chartnames: any[] = [];
    let basenftvalues: any[] = [];
    let usernftvalues: any[] = [];

    userNft.forEach((ele: any) => {
      chartnames.push(ele.name);
      let temp = nft.filter((v: any) => {
        return v._id === ele._id;
      });

      usernftvalues.push(ele.value);
      basenftvalues.push(temp[0].value);
    });

    setChartName(chartnames);
    setChartBaseNft(basenftvalues);
    setUserChartNft(usernftvalues);
  };

  return !loading ? (
    <div
      style={{
        padding: "0px 32px 0px 32px",
        minWidth: "320px",
      }}
    >
      <div style={{ marginTop: "30px" }}>
        <Row>
          <Col xl={6} md={4} lg={2} sm={0}></Col>
          <Col xl={12} md={18} lg={20} sm={24}>
            <CChart
              type="line"
              data={{
                labels: chatname,
                datasets: [
                  {
                    label: "BaseNFT",
                    backgroundColor: "rgba(220, 220, 220, 0.2)",
                    borderColor: "rgba(220, 220, 220, 1)",
                    pointBackgroundColor: "rgba(220, 220, 220, 1)",
                    pointBorderColor: "#fff",
                    data: chartBaseNft,
                  },
                  {
                    label: "UserNFT",
                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                    borderColor: "rgba(151, 187, 205, 1)",
                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    pointBorderColor: "#fff",
                    data: userChartNft,
                  },
                ],
              }}
            />
          </Col>
        </Row>
      </div>
      <div>
        <h2 style={{ color: "#95dbd5", padding: "8px" }}>UserNFT</h2>
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
              <Col xl={4} md={8} lg={6} sm={12} style={{ padding: "8px" }}>
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "60px",
        }}
      >
        <Button type="link" href="/">
          <span
            style={{ fontSize: "18px", fontWeight: "bold", color: "#95dbd5" }}
          >
            {"< GoTo BaseNFT"}
          </span>
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default UserNFT;
