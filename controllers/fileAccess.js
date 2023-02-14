import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const Download = async (req, res) => {
    res.status(StatusCodes.OK).send("file downloaded successfully")
};

const Upload = async (req, res) => {
    res.status(StatusCodes.OK).send("file uploaded successfully")
};



export { Download, Upload};
