
import { RequestHandler, Request, Response } from "express";
import { NFT } from "../model/basenft";
import mongoose from "mongoose";

export const getBaseNft = async (req: Request, res: Response) => {
  try {
    let data = await NFT("base_nfts").find({}).sort({ value: "desc" });
    return res.status(200).json({ code: 200, data: data, message: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ code: 500, message: "failed" });
  }
}

export const getUserNft = async (req: Request, res: Response) => {
  try {

    let { user_name } = req.body;
    const dbname = user_name || 'user_yash';
    let data = await NFT(dbname).find({}).sort({ value: "desc" });
    return res.status(200).json({ code: 200, data: data, message: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ code: 500, message: "failed" });
  }
}

export const createOrUpdateUserNFT = async (req: Request, res: Response) => {

  try {
    let { data } = req.body;

    let nftData = JSON.parse(data);

    const nftschema = NFT('user_yash');

    nftData.map(async (ele: any) => {

      let info = ele.info.split(" ");

      let value = info.length > 5 ? Number(ele.value) + 5 * 5 + 10 * (info.length - 5) : Number(ele.value) + 5 * info.length;

      let userdata = new nftschema({
        _id: new mongoose.Types.ObjectId,
        name: ele.name,
        image: ele.image,
        value: value,
        info: ele.info,
      });

      await userdata.save();

    })

    return res.status(200).json({ code: 200, message: "created succuess" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ code: 500, message: "failed" });
  }
}

export const updateNft = async (req: Request, res: Response) => {

  try {
    let { data } = req.body;

    let nftData = JSON.parse(data);

    const nftschema = NFT('user_yash');

    nftData.map(async (ele: any) => {

      let info = ele.info.split(" ");

      let value = info.length > 5 ? Number(ele.value) + 5 * 5 + 10 * (info.length - 5) : Number(ele.value) + 5 * info.length;

      let userdata = await nftschema.findById(new mongoose.Types.ObjectId(ele._id))

      if (userdata) {
        userdata.name = ele.name;
        userdata.value = value;
        userdata.info = ele.info;
        userdata.image = ele.image;
        await userdata.save()
      } else {
        return res.status(400).json({ code: 400, message: "invalid request" });
      }

    })

    return res.status(200).json({ code: 200, message: "updated succuess" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ code: 500, message: "failed" });
  }
}