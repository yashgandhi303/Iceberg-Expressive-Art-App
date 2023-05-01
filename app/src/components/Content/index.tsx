import react from "react";
import { Card, Space } from "antd";

import "../../styles/style.css";
import { render } from "react-dom";

function Content() {
  const NFT = [
    {
      name: "Kong_Arise",
      image:
        "https://ground-truth-media.jpgstoreapis.com/QmQq5U1a9t8HjsLgxpJvfPdYe6L71D4PEAHpjx8zRjLVSQ.sz_860833.dims_2000x2000.anim_0.png",
      value: 10000,
      info: "Its time for all Kongs to arise!",
    },
    {
      name: "Clay_Nationalist",
      image:
        "https://converted-media.jpgstoreapis.com/Qma2AYF3vw1o7ppP6cFVBjCpio4bwGPStpmQXNutaR2iUH.sz_214738.dims_800x800.anim_0.webp",
      value: 2500,
      info: "Clays should be a national resource",
    },
    {
      name: "Clay_Tourist",
      image:
        "https://converted-media.jpgstoreapis.com/QmVa8jXg3AqDFzTnYsKdGkNVW4wqJBq1YodejJP33npCfR.sz_206932.dims_800x800.anim_0.webp",
      value: 4000,
      info: "I'd love to visit Malawi next, just for clays",
    },
    {
      name: "Cool_Kong",
      image:
        "https://converted-media.jpgstoreapis.com/QmZBj17SKnVUMx5RQMuL9N257QVwvoLR3fFMxmrhov6CuP.sz_104364.dims_800x800.anim_0.webp",
      value: 4670,
      info: "Kongs are just cooler",
    },
    {
      name: "Prime_Duck",
      image:
        "https://image-optimizer.jpgstoreapis.com/QmQxLG94vhYA7nwt3vUaiBAg688zCd1WZQfRj85v7PxRG3?width=600",
      value: 2000,
      info: "My quacks are expensive!",
    },
    {
      name: "Duck_Flex",
      image:
        "https://image-optimizer.jpgstoreapis.com/Qmb5VGKLGtHhJmkagGYJKgi85g33tazbM7FML7DbKuE792?width=600",
      value: 23000,
      info: "I could chill but wheres the fun in that",
    },
  ];

  return (
    <div
      style={{
        marginTop: " 50px",
        padding: 20,
      }}
    >
      <div>
        <h1>BaseNFT</h1>
      </div>
      <div
        style={{
          display: " flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {NFT.map((value: any, key: any) => (
          <Card
            size="small"
            title={value.name}
            style={{ width: "15%", marginTop: "10px" }}
            key={key}
          >
            <div>
              <img src={value.image} style={{ width: "100%" }}></img>
            </div>
            <p style={{ textAlign: "center" }}>{value.value}</p>
            <div style={{textOverflow: 'ellipsis'}}>
              <p style={{ textAlign: "center",whiteSpace: 'nowrap', width: '90%'}}>{value.info}</p>
            </div>
            
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Content;
