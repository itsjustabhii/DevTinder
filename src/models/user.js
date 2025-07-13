const mongoose = require("mongoose")

//Creating user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
    photoUrl:{
        type:String
    },
    about:{
        type: String
    },
    skills:{
        type:{String}
    }

})

//Creating user model
module.exports = mongoose.model("User", userSchema)