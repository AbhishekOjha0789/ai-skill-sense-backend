import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    password: String,

    users: Object,
    personal_info: Object,
    professional_info: Object,
    social_info: Object,
    user_points: Object,
    
    skills: Array,
    quest_log: Array,
    settings: Object
});

export const User = mongoose.model("User", UserSchema);
