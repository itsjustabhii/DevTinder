const mongoose = require('mongoose')

const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://itsjustabhii:Lewishamilton@devtinder.eo70w7c.mongodb.net/")
}

module.exports = connectDB


