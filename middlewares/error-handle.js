import { StatusCodes } from "http-status-codes";

//express can identify if we are passing 4 parameters then first one will be for error

const errorHandleMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong please try again later",
  };

 
  if (err.name === "ValidationError") {
    defaultError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    //code 11000 is generaally refers to invalid foramat or duplicate document
    (defaultError.statusCode = StatusCodes.BAD_REQUEST),
      (defaultError.message = `${Object.values(
        err.keyValue
      )} already exixts , please provide different ${Object.keys(
        err.keyValue
      )}`);
  }

  res.status(defaultError.statusCode).json({
    msg: defaultError.message,
  });
};

export default errorHandleMiddleware;
