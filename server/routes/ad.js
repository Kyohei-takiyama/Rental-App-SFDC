import { Router } from "express";
import { uploadImage, removeImage, create } from "../controller/ad.js";
import { requireSignin } from "../middleware/auth.js";

const router = Router();

router.post("/upload-image", requireSignin, uploadImage);
router.post("/remove-image", requireSignin, removeImage);
router.post("/ad", requireSignin, create);

export default router;
