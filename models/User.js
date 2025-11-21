const UserSchema = new mongoose.Schema({

    uid: { type: String, required: true, unique: true },
    password: String,

    users: Object,             // table: users
    personal_info: Object,     // table: personal_info
    professional_info: Object, // table: professional_info
    social_info: Object,       // table: social_info
    user_points: Object,       // table: user_points
    
    skills: Array,             // table: skills
    quest_log: Array,          // table: quest_log
    settings: Object           // table: settings
});
