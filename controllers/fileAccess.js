import User from "../models/User.js";
import File from "../models/FileModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const Download = async (req, res) => {
    res.status(StatusCodes.OK).send("file downloaded successfully")
};

const Upload = async (req, res) => {
    const { encrptedData, usedKey,email } = req.body;
  if (!encrptedData || !usedKey || !email) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const ownerArray=[];
  ownerArray.push(email)
  const data = await File.create({ encrptedData, usedKey, ownerArray });

  console.log(data);

  res.status(StatusCodes.OK).send("File uploaded successfully");
};



export { Download, Upload};
