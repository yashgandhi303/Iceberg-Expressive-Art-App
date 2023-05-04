/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Row } from "antd";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { dataLoadingTypes } from "../store/types/loading";
import { useActions } from "../hooks/useActions";
import { Chart, NFTCard } from "../component";
import "../styles/user-nft.css";

export const UserNFTContainer = () => {
  const { userNft } = useTypedSelector((state) => state.userNft);
  const { nft } = useTypedSelector((state) => state.nft);
  const [chartData, setChartData] = useState<any>([]);
  const { fetchUserNfts, fetchBaseNfts } = useActions();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchdata = async () => {
      await dispatch({ type: dataLoadingTypes.dataLoadingSuccess });
      await fetchUserNfts();
      await fetchBaseNfts();
      await dispatch({ type: dataLoadingTypes.dataLoadingFail });

      formChartData();
    };
    fetchdata();
  }, []);

  useEffect(() => {
    if (nft.length !== 0 && userNft.length !== 0) {
      formChartData();
    }
  }, [nft, userNft]);

  const formChartData = () => {
    let formData: any[] = [];

    userNft.forEach((ele: any) => {
      let temp = nft.filter((v: any) => v._id === ele._id);

      let data = {
        name: ele.name,
        BaseNFT: temp[0].value,
        UserNFT: ele.value,
      };
      formData.push(data);
    });
    setChartData(formData);
  };

  if (userNft.length <= 0) {
    return (
      <div className="user_nft">
        <div>
          <h2 className="title">{'Sorry, No User-NFT data :('}</h2>
        </div>
        <div className="action_button">
          <Button type="link" href="/">
            <span className="btn-span">
              {"< GoTo BaseNFT"}
            </span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="user_nft">
      <div className="m-t-30">
        <div className="res-chart">
          <Chart data={chartData} />
        </div>
      </div>
      <div>
        <h2 className="title">UserNFT</h2>
      </div>
      <Row>
        {userNft.map((value: any, key: any) => (
          <Col xl={4} md={8} lg={6} sm={12} className="p-8">
            <NFTCard key={key} user={{ ...value }} type="edit" />
          </Col>
        ))
        }
      </Row>
      <div className="action_button">
        <Button type="link" href="/">
          <span className="btn-span">
            {"< GoTo BaseNFT"}
          </span>
        </Button>
      </div>
    </div>
  )
}
