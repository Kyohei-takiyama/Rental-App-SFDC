import Jwt from "jsonwebtoken";

import { constants } from "../config.js";
import { wrapAsync } from "../utils/asyncWrapper.js";

const requireSignin = wrapAsync((req, res, next) => {
  // decode
  const decoded = Jwt.verify(
    req.headers.authorization,
    constants.JWT_SEACRET_KEY
  );
  req.user = decoded; // req.user._id
  next();
});

export { requireSignin };
