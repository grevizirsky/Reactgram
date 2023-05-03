const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String, 
    bio: String
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema) //User é o nome do model

module.exports = User