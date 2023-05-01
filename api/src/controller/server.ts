
import { Request, Response  } from "express";
import {NFT} from "../model/basenft";
import mongoose from "mongoose";
import isEmpty from "../utils/isEmpty";

export const getBaseNft = async (req: Request, res: Response ) => {
    try {
        let data = await NFT("base_nfts").find({}).sort({value: "desc"});
        return res.status(200).json({code: 200, data: data, message: 'success'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({code: 500, message: "server crashed, please check the logs"});
    }
}

export const getUserNft = async (req: Request, res: Response) => {
  try {

        // let { user_name } = req.body;

        // if (isEmpty(user_name)) {
        //   return res.status(400).json({code: 400, message: "invalid collection name."});
        // }
        let data = await NFT('user_yash').find({}).sort({value: "desc"});
        return res.status(200).json({code: 200, data: data, message: 'success'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({code: 500, message: "server crashed, please check the logs"});
    }
}

export const createAndUpdateNft = async (req: Request, res: Response ) => {
    
  try {

      let { _id, name, image, value, info, user_name} = req.body;

      if (isEmpty(_id) || isEmpty(name) || isEmpty(image) || isEmpty(info) || isEmpty(user_name) || isEmpty(value)) {
        return res.status(400).json({code: 400, message: "Some fields missing or is empty."});
      }

      let nftschema = NFT(user_name);

      let baseschema = NFT('base_nfts');

      let infovalue = info.split(" ");      
      
      let userData = await nftschema.findById(new mongoose.Types.ObjectId(_id));
      let existingData = await baseschema.findById(new mongoose.Types.ObjectId(_id));

      if (isEmpty(existingData)) {
        return res.status(400).json({code: 400, message: "Base Nft collection is Empty!"});
      }

      value = info.length > 5 ? Number(existingData?.value) + 5 * 5 + 10 * (infovalue.length - 5) : Number(existingData?.value) + 5 * infovalue.length;

      if (userData) {
          userData.name = name;
          userData.value = value;
          userData.info = info;
          userData.image = image;
          await userData.save();
          return res.status(202).json({code: 202, message: "updated NFT"});
      } else {

          let createdata = new nftschema({
            _id: new mongoose.Types.ObjectId(_id),
            name: name,
            image: image,
            value: value,
            info: info,
        });

        await createdata.save();
        return res.status(201).json({code: 201, message: "created NFT"});
      }

  } catch (err) {
      console.log(err);
      return res.status(500).json({code: 500, message: "server crashed, please check the logs"});
  }
}