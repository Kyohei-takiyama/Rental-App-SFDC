import { Router } from "express";
import { preRegister } from "../controller/auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("auth.js");
});

router.post("/pre-register", preRegister);

export default router;
