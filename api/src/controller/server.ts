import { Request, Response } from "express";
import { NFT } from "../model/basenft";
import mongoose from "mongoose";
import isEmpty from "../utils/isEmpty";

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

export const getUserNft = async (req: Request, res: Response) => {
  try {
    let data = await NFT("user_yash").find({}).sort({ value: "desc" });
    return res.status(200).json({ code: 200, data: data, message: "success" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ code: 500, message: "server crashed, please check the logs" });
  }
};

export const createAndUpdateNft = async (req: Request, res: Response) => {
  try {
    let { _id, name, image, value, info } = req.body;

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

    

    // value =
    //   infovalue.length > 5
    //     ? Number(existingData?.value) + 5 * 5 + 10 * (infovalue.length - 5)
    //     : Number(existingData?.value) + 5 * infovalue.length;

    if (isEmpty(existingData)) {
      return res
        .status(400)
        .json({ code: 400, message: "Base Nft collection is Empty!" });
    }

    let temp = info
      .split(" ")
      .filter((x: any) => x && x !== " ")
      .map((x: any) => x.trim());

    let baseinfo = existingData?.info
      .split(" ")
      .filter((x: any) => x && x !== " ")
      .map((x: any) => x.trim());
    let finalinfo = temp.join(" ");

    let upcount = 0;  // new word count
    let decount = 0;  // deleted baseword count
    let templeave: string | string[] = [];
    for (let x of temp) {
      if (baseinfo?.includes(x)) {
        if (templeave.includes(x)) {
          upcount = upcount + 1;
        } else {
          templeave.push(x);
        }
      } else {
        upcount = upcount + 1;                  // new word count
      }
    }

    templeave = [];
    if (baseinfo) {
      for (let y of baseinfo) {
        if (!temp?.includes(y)) {
          decount = decount + 1;             // deleted baseword count
        }  
      }
    }
    
    value = upcount > 5 ?  Number(existingData?.value) + 5 * 5 + (upcount - 5 ) * 10 : Number(existingData?.value) + 5 * upcount;
    value = decount > 5 ? value - 5 * 5 - (decount - 5) * 10 : value - 5 * decount;

    if (userData) {
      userData.name = name;
      userData.value = value;
      userData.info = info;
      userData.image = image;
      await userData.save();
      return res.status(202).json({ code: 202, message: "updated NFT" });
    } else {
      if (String(info) === String(existingData?.info)) {
        return res
          .status(400)
          .json({
            code: 400,
            message:
              "we cannot create add this data because info has not changed!",
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
