import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

const responseUserAndTokens = (user, JWTSeacretKey) => {
  // create jwt token
  const { token, refreshToken } = generateJWTs(user._id, JWTSeacretKey);
  // send response
  user.password = undefined;
  user.restCode = undefined;

  return { token, refreshToken, user };
};

const generateJWTs = (userId, JWTSeacretKey) => {
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
};

export { hashPassword, comparePassword, responseUserAndTokens };
