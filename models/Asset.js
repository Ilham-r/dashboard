import { Schema, model, models } from "mongoose";

const AssetSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "A description is required"],
  },
  image: {
    type: [String],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Asset = models.Asset || model("Asset", AssetSchema);
export default Asset;
