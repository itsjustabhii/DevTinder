const mongoose = require('mongoose')

const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://itsjustabhii:RPfdfgTHglGprF4r@nodetutorial.odvzbzm.mongodb.net/?retryWrites=true&w=majority&appName=NodeTutorial/DevTinder")
}

module.exports = connectDB


