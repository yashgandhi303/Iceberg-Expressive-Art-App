import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Row } from "antd";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { dataLoadingTypes } from "../store/types/loading";
import { useActions } from "../hooks/useActions";
import { NFTCard } from "../component";

import "../styles/base-nft.css";

export const BaseNFTContainer = () => {
  const { nft: base_nft } = useTypedSelector((state) => state.nft);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (base_nft.length <= 0) {
    return (
      <div>
        <h2 className="p-8 primary-color">{'Sorry, No base-nft data :('}</h2>
      </div>
    );
  }

  return (
    <div className="base_nft">
      <div>
        <h2 className="title">BaseNFT</h2>
      </div>
      <Row>
        {base_nft.map((value: any, key: any) => (
          <Col xl={4} md={8} lg={6} sm={12} className="p-8">
            <NFTCard key={key} user={{ ...value }} type="create" />
          </Col>
        ))
        }
      </Row>
      <div className="action_button">
        <Button type="link" href="/usernft">
          <span className="btn-span">
            {"GoTo UserNFT >"}
          </span>
        </Button>
      </div>
    </div>
  )
}
