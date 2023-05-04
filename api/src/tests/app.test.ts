import * as request from "supertest";
import { app } from "../app";
import { NFT } from "../model/basenft";

let server;

describe("All Endpoints", () => {

  beforeAll(() => {
    server = app.listen(3000); // start the server
  });

  afterAll((done) => {
    server.close(done); // close the server and any open connections
  });


  it("should get a base nft", async () => {
    // Initializing data
    const baseschema = NFT("base_nfts");
    const basedoc = new baseschema;
    basedoc.name = "envue";
    basedoc.image = "https://envue.com"
    basedoc.value = 2000
    basedoc.info = "I'd love to visit Malawi next, just for clays"
    basedoc.save()


    const response = await request(app).get('/iceberg/getBaseNft');
    expect(response.statusCode).toEqual(200);
    expect(response.body.data[0].image).toEqual("https://envue.com");
  });

  it("should fail to create nft", async () => {
    const nft = await request(app).get('/iceberg/getBaseNft');
    const id = nft.body.data[0]._id

    const response = await request(app).post('/iceberg/createUserNft').send({
      _id: id,
      name: "envue",
      image: "https://envue.com",
      value: 2000,
      info: "I'd love to visit Malawi next, just for clays",
    });
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("we cannot create or add this data because info has not changed!");
  });

  it("should create nft", async () => {
    const nft = await request(app).get('/iceberg/getBaseNft');
    const id = nft.body.data[0]._id

    const response = await request(app).post('/iceberg/createUserNft').send({
      _id: id,
      name: "envue",
      image: "https://envue.com",
      value: 2000,
      info: "I'd love to visit Malawi next, just",
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body.message).toEqual("created NFT");
  });

  it("should get a user nft", async () => {
    const response = await request(app).get('/iceberg/getUserNft');
    expect(response.statusCode).toEqual(200);
    expect(response.body.data[0].value).toEqual(1990);
  });

  it("should fail to create nft as there are no changes in info", async () => {
    // no change in data, it is as above use case
    const response = await request(app).post('/iceberg/createUserNft').send({
      _id: "6452e5ef7f87a8df11034a9e",
      name: "envue",
      image: "https://envue.com",
      value: 2000,
      info: "I'd love to visit Malawi next, just",
    });
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Base Nft collection is Empty!");
  });

  it("should fail to create nft as it has missing name field", async () => {
    // missing field "name"
    const response = await request(app).post('/iceberg/createUserNft').send({
      _id: "6452e5ef7f87a8df11034a9e",
      image: "https://envue.com",
      value: 2000,
      info: "I'd love to visit Malawi next, just",
    });
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Some fields missing or is empty.");
  });

  it("should update nft", async () => {
    const nft = await request(app).get('/iceberg/getUserNft');
    const id = nft.body.data[0]._id

    const response = await request(app).post('/iceberg/createUserNft').send({
      _id: id,
      name: "envue",
      image: "https://envue.com",
      value: 2000,
      info: "I'd love to visit Malawi",
    });
    expect(response.statusCode).toEqual(202);
    expect(response.body.message).toEqual("updated NFT");
  });
});


