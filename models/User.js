import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Your tables (everything stored under user document)
  personal_info: { type: Object, default: {} },
  professional_info: { type: Object, default: {} },
  skills: { type: Array, default: [] },
  courses: { type: Array, default: [] },
  projects: { type: Array, default: [] },
  achievements: { type: Array, default: [] },
  extracurricular: { type: Array, default: [] },
  internships: { type: Array, default: [] },
  social_links: { type: Object, default: {} }
});

export default mongoose.model("User", UserSchema);
