import { Router } from "express";
import { login, preRegister, register } from "../controller/auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("auth.js");
});

router.post("/pre-register", preRegister);
router.post("/register", register);
router.post("/login", login);

export default router;
