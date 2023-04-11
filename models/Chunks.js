import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chunksSchema = new Schema(
  {
    // content: { type: String },
    // decrypted: { type: String },
    encrypted: { type: String },
    hash: { type: String },
    configurations : {
      type : Object
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chunks", chunksSchema);
