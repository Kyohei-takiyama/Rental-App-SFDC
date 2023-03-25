import { nanoid } from "nanoid";

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

export { uploadImage, removeImage };
