import mongoose from "mongoose"

export const basenftschema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
    unique: true
  },
  name: {
    type: String,
    default: ""
  },
  image: {
    type: String,
    default: ""
  },
  value: {
    type: Number,
    default: 0,
  },
  info: {
    type: String,
    default: "",
  },
  _v: {
    type: Number,
  }

})

export const NFT = (value: any) => {
  return mongoose.model(value, basenftschema);
}