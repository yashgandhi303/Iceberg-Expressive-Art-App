import { Request, Response } from "express";
import { NFT } from "../model/basenft";
import mongoose from "mongoose";
import isEmpty from "../utils/isEmpty";

const splitString = (info: String) => info.split(" ")
  .filter((x: String) => x && x !== " ")
  .map((x: String) => x.replace(/[^a-zA-Z0-9 ]/g, ""))
  .map((x: String) => x.trim());

// get Basenft data
export const getBaseNft = async (req: Request, res: Response) => {
  try {
    let data = await NFT("base_nfts").find({}).sort({ value: "desc" });
    return res.status(200).json({ code: 200, data: data, message: "success" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ code: 500, message: "server crashed, please check the logs" });
  }
};

// get usernft data
export const getUserNft = async (req: Request, res: Response) => {
  try {
    // TODO: we can create dynamic user (user_yash, user_dawich, etc) 
    // based on input we get in request (client)
    let data = await NFT("user_yash").find({}).sort({ value: "desc" });
    return res.status(200).json({ code: 200, data: data, message: "success" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ code: 500, message: "server crashed, please check the logs" });
  }
};

// create or update data from user collection
export const createAndUpdateNft = async (req: Request, res: Response) => {
  try {
    let { _id, name, image, value, info } = req.body;

    // validation
    if (
      isEmpty(_id) ||
      isEmpty(name) ||
      isEmpty(image) ||
      isEmpty(info) ||
      isEmpty(value)
    ) {
      return res
        .status(400)
        .json({ code: 400, message: "Some fields missing or is empty." });
    }

    let nftschema = NFT("user_yash");
    let baseschema = NFT("base_nfts");

    let userData = await nftschema.findById(new mongoose.Types.ObjectId(_id));
    let existingData = await baseschema.findById(
      new mongoose.Types.ObjectId(_id)
    );

    // what if base nft is only empty or doesn't exist
    if (isEmpty(existingData)) {
      return res
        .status(400)
        .json({ code: 400, message: "Base Nft collection is Empty!" });
    }

    let upcount = 0; // new word count
    let decount = 0; // deleted baseword count
    let templeave: string | string[] = [];
    templeave = [];

    // all the logic for value and info field
    let temp = splitString(info)
    // above and below, we are removing unnecessary space,
    // removing characters, AS WE WANT ONLY WORDS
    let baseinfo = splitString(existingData?.info)

    for (let x of temp) {
      if (baseinfo?.includes(x)) {
        if (templeave.includes(x)) {
          upcount = upcount + 1;
        } else {
          templeave.push(x);
        }
      } else {
        upcount = upcount + 1; // new word count
      }
    }

    if (baseinfo) {
      for (let y of baseinfo) {
        if (!temp?.includes(y)) {
          decount = decount + 1; // deleted baseword count
        }
      }
    }

    value =
      upcount > 5
        ? Number(existingData?.value) + 5 * 5 + (upcount - 5) * 10
        : Number(existingData?.value) + 5 * upcount;
    value =
      decount > 5 ? value - 5 * 5 - (decount - 5) * 10 : value - 5 * decount;

    if (userData) {
      userData.name = name;
      userData.value = value;
      userData.info = info;
      userData.image = image;

      // save the data to the user collection
      await userData.save();
      return res.status(202).json({ code: 202, message: "updated NFT" });
    } else {
      
      // validation
      if (String(info) === String(existingData?.info)) {
        return res.status(400).json({
          code: 400,
          message:
            "we cannot create or add this data because info has not changed!",
        });
      }

      let createdata = new nftschema({
        _id: new mongoose.Types.ObjectId(_id),
        name: String(existingData?.name),
        image: String(existingData?.image),
        value: Number(value),
        info: String(info),
      });

      await createdata.save();
      return res.status(201).json({ code: 201, message: "created NFT" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ code: 500, message: "server crashed, please check the logs" });
  }
};
