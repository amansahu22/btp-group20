import express from "express";
const router = express.Router();

//express-rate-limit to limit the amount of request by one IP address
import expressLimit from "express-rate-limit";

const apiLimiter = expressLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 10, //maximum 10 req in 15 minutes
  message:
    "Too many request from this IP address, please try again later after 15 minutes",
});

import { Register, Login} from "../controllers/authController.js";

router.post("/register", apiLimiter, Register);

router.post("/login", apiLimiter, Login);


export default router;
