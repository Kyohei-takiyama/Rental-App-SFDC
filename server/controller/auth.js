import Jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import validator from "email-validator";

import { wrapAsync } from "../utils/asyncWrapper.js";
import * as config from "../config.js";
import { emailTemplate } from "../helpers/email.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import User from "../model/User.js";

const preRegister = wrapAsync(async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  // validation
  if (!validator.validate(email)) {
    throw new Error("メールアドレスが有効な形式ではありません。");
  }
  if (!password) {
    throw new Error("パスワードが入力されていません");
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new Error("すでにユーザが登録されています");
  }

  const token = Jwt.sign(
    { email, password },
    config.constants.JWT_SEACRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  config.AWSSES.sendEmail(
    emailTemplate(
      email,
      `<p>下のリンクをクリックして、アカウントを有効化してください</p>
      <a href=${config.constants.CLIENT_URL}/auth/account-activate/${token}>アカウントを有効化</a>`,
      config.constants.REPLY_TO,
      "Test sending from SFDC app"
    ),
    (err, data) => {
      if (err) {
        console.log("ERROR::::", err);
        return res.json({ ok: false });
      }
      console.log(data);
      return res.json({ ok: true });
    }
  );
});

const register = wrapAsync(async (req, res) => {
  console.log(req.body);

  // decode JWT
  const { email, password } = Jwt.verify(
    req.body.token,
    config.constants.JWT_SEACRET_KEY
  );
  console.log(email, password);

  // hashed Password
  const hashedPassword = await hashPassword(password);

  // create new user
  const newUser = new User({
    username: nanoid(6),
    password: hashedPassword,
    email,
  });

  // saved db
  const savedUser = await newUser.save();

  // generate jwonwebtoken
  const { token, refreshToken } = generateTokens(
    savedUser._id,
    config.constants.JWT_SEACRET_KEY
  );

  savedUser.password = undefined;
  savedUser.restCode = undefined;

  return res.json({ token, refreshToken, savedUser }).status(201);
});

const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  // find user by email
  const userFindByEmail = await User.findOne({ email });
  if (!userFindByEmail) {
    throw new Error("ユーザが登録されていません");
  }
  // compare passoword
  const match = await comparePassword(password, userFindByEmail.password);
  if (!match) {
    throw new Error("パスワードが間違っています");
  }
  // create jwt token
  const { token, refreshToken } = generateTokens(
    userFindByEmail._id,
    config.constants.JWT_SEACRET_KEY
  );
  // send response
  userFindByEmail.password = undefined;
  userFindByEmail.restCode = undefined;

  return res.json({ token, refreshToken, userFindByEmail }).status(201);
});

function generateTokens(userId, JWTSeacretKey) {
  // generate jwonwebtoken
  const token = Jwt.sign({ _id: userId }, JWTSeacretKey, {
    expiresIn: "1h",
  });
  const refreshToken = Jwt.sign({ _id: userId }, JWTSeacretKey, {
    expiresIn: "7d",
  });
  return {
    token,
    refreshToken,
  };
}

export { preRegister, register, login };
