import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    photo: {},
    role: {
      type: String,
      default: "Buyar",
      enum: ["Buyar", "Sellar", "Admin"],
    },
    enquiredProperties: [{ type: Schema.Types.ObjectId, ref: "Ad" }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Ad" }],
    restCode: "",
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
