import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  encrptedData: {
    type: String,
    required: [true, "Please Provide name"],
    trim: true,
  },

  usedKey: {
    type: String,
    required: [true, "Please Provide email"],
  },

  ownerArray:[String]
});



export default mongoose.model("File", fileSchema);
