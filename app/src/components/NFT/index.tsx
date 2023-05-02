import { Divider } from "antd";

function Nft(prop: any) {
  let { name, image, value, info } = prop;
  return (
    <div
      style={{ width: "100%", borderRadius: "12px", backgroundColor: 'white' ,borderStyle: 'solid', borderColor: 'grey', boxShadow: '2px 4px #888888'}}
    >
      <div>
        <p
          style={{
            fontSize: "12px",
            textAlign: "center",
            paddingTop: "8px",
            fontWeight: "bold",
          }}
        >
          {name}
        </p>
      </div>
      <Divider type="horizontal" style={{ marginTop: "-4px" }}></Divider>
      <div
        style={{ marginTop: "-12px", paddingLeft: "8px", paddingRight: "8px" }}
      >
        <img src={image} style={{ width: "100%", borderRadius: "8px" }}></img>
      </div>
      <div>
        <p style={{ fontSize: "12px", textAlign: "center" }}>{value}</p>
      </div>
      <div style={{ display: "flex", justifyContent: 'space-around'}}>
        <div
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "80%",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "12px", textAlign: "center" }}>{info}</p>
        </div>
      </div>
    </div>
  );
}

export default Nft;
