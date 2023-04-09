import express from "express";
const router = express.Router();


import { Download,Upload, checkHash} from "../controllers/fileAccess.js";

router.post("/download", Download);

router.post("/upload", Upload);

router.post("/check-hash",checkHash)


export default router;
