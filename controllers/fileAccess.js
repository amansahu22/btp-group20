import User from "../models/User.js";
import File from "../models/FileModel.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import Chunks from "../models/Chunks.js";

const Download = async (req, res) => {
    res.status(StatusCodes.OK).send("file downloaded successfully")
};

const checkHash = async (req,res) =>{

  const {hash,configurations:{email}} = req.body;

  if(!hash || !email) throw new BadRequestError('Please provide email and hash')

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  // Find the chunk with the given hash
  const chunk = await Chunks.findOne({ hash });

  if (chunk) {
    // Add the user to the list of users for this chunk
    // chunk.users.push(users[0]);
    await chunk.save();
    return res.status(200).json({ success: true, message: "Chunk Found" });
  } else {
    // Return a 404 error if the chunk is not found
    return res.status(404).json({ success: false, message: "Chunk not found" });
  }
}

const Upload = async (req, res) => {
  const { hash, encrypted, configurations } = req.body;

   if (!configurations || !encrypted || !hash) {
    throw new BadRequestError("Please provide all values");
  }

  const {email,uniqueFileId,fileName} = configurations;

  const user = await User.findOne({ email });

  if(user.files.length === 0){
    user.files.push({uniqueFileId,fileName});
    await user.save();
  }

  if( user.files.length !=0 && !user.files.find(el=>el.uniqueFileId===uniqueFileId)){
    user.files.push({uniqueFileId,fileName});
    await user.save();
  }

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  // Create a new chunk object



  const newChunk = new Chunks({
    encrypted,
    hash,
    configurations
  });

  try {
    // Save the new chunk to the database
    const savedChunk = await newChunk.save();
    return res.status(201).json({ success: true, data: savedChunk });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error saving chunk" });
  }
};

const getAllFileNames = async (req,res)=>{
  const email = req.params.email;

  if(!email) throw new BadRequestError('Please provide email and hash')

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const response = user.files;

  res.status(StatusCodes.OK).send(response);
}


export { Download, Upload, checkHash , getAllFileNames};
