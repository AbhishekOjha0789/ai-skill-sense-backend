import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: String,
  password: String,
  personal_info: Object,
  skills: Array
});

export default mongoose.model("User", UserSchema);
