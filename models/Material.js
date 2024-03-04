import { model, models, Schema } from "mongoose";

const MaterialSchema = new Schema({
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
const Material = models.Material || model("Material", MaterialSchema);
export default Material;
