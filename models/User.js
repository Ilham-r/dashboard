import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
  username: {
    type: String,
    require: [true, "Username is required!"],
    match: [
      /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },

  password: {
    type: String,
    require: [true, "password is required!"],
  },
});

const User = models.User || model("User", UserSchema);
export default User;
