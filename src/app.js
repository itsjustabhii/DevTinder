const express = require('express')
const connectDB = require("./config/database")
const app = express()
const User = require("./models/user")
// const {adminAuth, userAuth} = require("./middleswares/auth")

app.use(express.json())

//User Signup
app.post("/signup", async(req,res)=>{
    //Creating new instance of a user
    const user  = new User (req.body)
    
    await user.save()
    res.send('User data added!')
})

//Get USER by email
app.get("/user", async(req,res)=>{
    const userEmail = req.body.emailId
    //finding user from database
    try {
        const users = await User.find({emailId:userEmail})
        if(users.length === 0){
            res.status(404).send("User not found!")
        } else{
            res.send(users)
        }
        
    } catch (err) {
        res.status(400).send('Something went wrong!')
    }
})

//Feed - Get all users from database
app.get("/feed", async(req,res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(400).send('User not found!')
    }
})

//Delete a user by ID
app.delete("/user", async(req,res) => {
    const userId = req.body.userId
    try {
        // const user = await User.findByIdAndDelete({_id: userId}) either this or next line is the same
        const user = await User.findByIdAndDelete(userId)
        res.send("User deleted successfully")
    } catch (err) {
        res.status(400).send('Something went wrong!')
    }
})

//Update the user
app.patch("/user", async(req,res) => {
    const userId = req.body.userId
    const data = req.body
    console.log(data)
    try {
         await User.findByIdAndUpdate(userId, data, {
            returnDocument: "after",
            runValidators: true
         })
        res.send("Update successful")
    } catch (err) {
        res.status(400).send("Something went wrong!")
    }
})

connectDB().then(()=>{
    console.log('Database connection successful!')
    app.listen(3000, ()=>{
    console.log("Server is successfully listening on PORT 3000...")
})
})
.catch((err)=>{
    console.error('Database cannot be connected', err.message)
})

// //Handle Auth middleware for all GET,POST,... request
// app.use("/admin", adminAuth)

// app.post("/user/login",(req,res)=>{
//     res.send("User logged in successfully!")
// })

// app.get("/user",userAuth, (req,res)=>{
//     res.send("User Data Sent!")
// })

// app.get("/user/getAllData", (err,req,res,next)=>{
//     try{
//         //code to connect to DB and return back
//         throw new Error("infienfif")
//         res.send("User data sent!")
//     }
//     catch(err)
//     {
//         res.status(500).send("Something went wrong!")
//     }
// })

// //Only if Authorisation completes, /admin executes
// app.get("/admin/getAllData", (req,res)=>{
//     res.send("All data sent")
// })

// app.get("/admin/deleteUser", (req,res)=>{
//     res.send("Delete a user!")
// })



