import { model, Schema } from "mongoose";

const AdSchema = new Schema(
  {
    photos: [{}],
    price: {
      type: Number,
      maxLength: 255,
    },
    address: {
      type: String,
      maxLength: 255,
      required: true,
    },
    bedrooms: Number,
    bathrooms: Number,
    landsize: String,
    carparks: Number,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      cordinates: {
        type: [Number],
        default: [35.652832, 139.839478],
      },
    },
    title: {
      type: String,
      maxLength: 255,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    description: {},
    postedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    sold: {
      type: Boolean,
      default: false,
    },
    googleMap: {},
    type: {
      type: String,
      default: "Other",
    },
    action: {
      type: String,
      default: "Sell",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Ad", AdSchema);
