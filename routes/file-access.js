import express from "express";
const router = express.Router();


import { Download,Upload, checkHash, getAllFileNames} from "../controllers/fileAccess.js";

router.get("/download/:fileId", Download);

router.post("/upload", Upload);

router.post("/check-hash",checkHash);

router.get("/get-files/:email",getAllFileNames);



export default router;
