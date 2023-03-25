import { nanoid } from "nanoid";
import slugfy from "slugify";

import Ad from "../model/Ad.js";
import User from "../model/User.js";
import { wrapAsync } from "../utils/asyncWrapper.js";
import * as config from "../config.js";

const uploadImage = wrapAsync((req, res) => {
  const { image } = req.body;

  const base64Image = new Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = image.split(";")[0].split("/")[1];

  const params = {
    Bucket: "rental-sfdc-app",
    Key: `${nanoid()}.${type}`,
    Body: base64Image,
    ACL: "public-read",
    ContentType: `image/${type}`,
  };

  config.AWSS3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
      throw new Error(err);
    }
    res.send(data);
  });
});

const removeImage = wrapAsync((req, res) => {
  const { Key, Bucket } = req.body;

  config.AWSS3.deleteObject({ Bucket, Key }, (err, data) => {
    if (err) {
      console.log(err);
      throw new Error(err);
    }
    console.log(Key);
    res.send({ ok: true, message: "レコードを削除しました", Key });
  });
});

const create = wrapAsync(async (req, res) => {
  console.log(req.body);
  const { photos, description, title, address, price, type, landsize } =
    req.body;
  if (!photos.length) {
    throw new Error("写真は必須です");
  }
  if (!description) {
    throw new Error("説明は必須です");
  }
  if (!title) {
    throw new Error("説明は必須です");
  }
  if (!address) {
    throw new Error("住所は必須です");
  }
  if (!type) {
    throw new Error("タイプは必須です");
  }

  const geo = await config.GOOGLE_GEOCODER.geocode(address);
  console.log("geo => ", geo);

  const ad = new Ad({
    ...req.body,
    postedBy: req.user._id,
    location: {
      type: "Point",
      cordinates: [geo[0].longitude, geo[0].latitude],
    },
    googleMap: geo,
  });
  await ad.save();

  // make user roll seller
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { roll: "Sellar" },
    },
    { new: true }
  );

  user.password = undefined;
  user.restCode = undefined;

  res.json({ ad, user });
});

export { uploadImage, removeImage, create };
