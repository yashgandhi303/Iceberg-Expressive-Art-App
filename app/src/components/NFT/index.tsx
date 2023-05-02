function Nft(prop: any) {
  let { name, image, value, info } = prop;
  return (
    <div
      style={{ width: "100%", borderRadius: "16px", backgroundColor: "white" }}
    >
      <div>
        <p style={{ fontSize: "12px", textAlign: "center" }}>{name}</p>
      </div>
      <div style={{ padding: "8px" }}>
        <img src={image} style={{ width: "100%", borderRadius: "4px" }}></img>
      </div>
      <div>
        <p style={{ fontSize: "12px", textAlign: "center" }}>{value}</p>
      </div>
      <div>
        <p style={{ fontSize: "12px", textAlign: "center" }}>{info}</p>
      </div>
    </div>
  );
}

export default Nft;
