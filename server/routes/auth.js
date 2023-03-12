import { Router } from "express";
import {
  login,
  preRegister,
  register,
  forgotPassword,
  accessAccount,
} from "../controller/auth.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("auth.js");
});

router.post("/pre-register", preRegister);
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/access-account", accessAccount);

export default router;
