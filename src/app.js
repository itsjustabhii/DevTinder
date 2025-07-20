const express = require('express')
const connectDB = require("./config/database")
const app = express()
const User = require("./models/user")
// const {adminAuth, userAuth} = require("./middleswares/auth")
const {validateSigUpData} = require('./utils/validation')
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middleswares/auth")

app.use(express.json())
app.use(cookieParser())

//User Signup
app.post("/signup", async(req,res)=>{
    try{
    //validate the data
    validateSigUpData(req)

    const {password} = req.body

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10)
    
    //Creating new instance of a user
    const user  = new User ({
        firstName,
        lastName,
        emailId,
        password:passwordHash   //stores password in DB
    })
    
    await user.save()
    res.send('User data added!')
    } catch(err){
        res.status(400).send("ERROR: "+ err.message)
    }
    
})

//Login API
app.post("/login", async(req,res) =>{
    try {
        const {emailId, password} = req.body
        //To check if user's email ID already exists or no
        const user = await User.findOne({emailId: emailId})        
        if(!user){
            throw new Error("Invalid Credentials!")
        }
        const isPasswordValid = await user.validatePassword(password) //comparing the typed password to the password stored in DB
        if(isPasswordValid){
            //Create a JWT Token
            const token = await user.getJWT()

            //Add the token to cookie and send the response back to the user
            res.cookie("token",token, {expires: new Date(Date.now() + 8 * 36000)})
            res.send('Login Successful')
        } else {
            throw new Error("Invalid Credentials")
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})

//Get Profile
app.get("/profile", userAuth, async(req, res)=>{
    try {
    //     const cookies = req.cookies

    //     const {token} = cookies
    // if(!token){
    //     throw new Error("Invalid Token!")
    // }
    // //validate the token
    // const decodedMessage = await jwt.verify(token, "DEV@Tinder$666")
    // console.log(decodedMessage)
    // const {_id} = decodedMessage //Get ID of logged in user
    // console.log("Logged in user is: " + _id)

    const user = req.user
    // if(!user){ //If user doesn't exists
    //     throw new Error("User doesn't exists!")
    // }
    res.send(user)
    } catch (error) {
        res.status(400).send("ERROR: " + err.message)
    } 
})

//Connection Request
app.post("/sendConnectionRequest", userAuth, async(req, res) =>{
    //Connection request
    console.log("Sending a connection request")

    res.send(user.firstName + " sent connection Request!")
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
app.patch("/user/:userId", async(req,res) => {
    const userId = req.params?.userId
    const data = req.body

    console.log(data)
    try {
        const ALLOWED_UPDATES = [ 'photoUrl', 'about', 'gender', 'age', 'skills']

    const isUpdateAllowed = Object.keys(data).every((k) =>
        ALLOWED_UPDATES.includes(k)
    )
    if(!isUpdateAllowed){
        throw new Error("Update not Allowed!")
    }
    if(data?.skills.length > 10){
        throw new Error("Skills cannot be more than 10 characters")
    }
        const user = await User.findByIdAndUpdate(userId, data, {
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



