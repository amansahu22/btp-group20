import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chunksSchema = new Schema(
  {
    // content: { type: String },
    // decrypted: { type: String },
    order: { type: Number },
    users: { type: Array },
    encrypted: { type: String },
    hash: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chunks", chunksSchema);
