import * as mongoose from "mongoose";

export const connector = () => {

  type ConnectionOptionsExtend = {
    useNewUrlParser: boolean
    useUnifiedTopology: boolean
  }
  

  mongoose
    .connect('mongodb+srv://iceberguser:accesstoassessment@icebergassess.rbjxgi4.mongodb.net/iceberglabsassess?ssl=true&authSource=admin')
    .then(() => {
      return console.info('Successfully connected to Database');
      
    })
    .catch((error) => {
      return console.log(error)
    });
}