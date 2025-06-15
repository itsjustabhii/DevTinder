const mongoose = require('mongoose')

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://itsjustabhii:Lewishamilton@44@devtinder.eo70w7c.mongodb.net/")
}

connectDB().then(()=>{
    console.log('Database connection successful!')
}).catch(err=>{
    console.error('Database cannot be connected')
})
