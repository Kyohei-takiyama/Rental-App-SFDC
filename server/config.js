import SES from "aws-sdk/clients/ses.js";
import S3 from "aws-sdk/clients/s3.js";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import Nodegeocoder from "node-geocoder";
dotenv.config();

export const constants = {
  MONGO_URI: process.env.MONGO_URI,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  REPLY_TO: process.env.EMAIL_FROM,
  JWT_SEACRET_KEY: process.env.JWT_SEACRET_KEY,
  CLIENT_URL: "http://localhost:3000",
};

// const awsConfig = {
//   accessKeyId: constants.AWS_ACCESS_KEY_ID,
//   secretAccessKey: constants.AWS_SECRET_ACCESS_KEY,
//   region: "ap-northeast-1",
//   apiVersion: "2010-12-01",
// };

// export const AWSSES = new SES(awsConfig);
AWS.config.update({ region: "ap-northeast-1" });
export const AWSSES = new AWS.SES();
export const AWSS3 = new AWS.S3();

// node geocoder
const options = {
  provider: "google",
  apiKey: process.env.GOOGLE_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null, // 'gpx', 'string', ...
};
export const GOOGLE_GEOCODER = Nodegeocoder(options);
