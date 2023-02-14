import express from "express";
const router = express.Router();


import { Download,Upload} from "../controllers/fileAccess.js";

router.post("/download", Download);

router.post("/upload", Upload);


export default router;
