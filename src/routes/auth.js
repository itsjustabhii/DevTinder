const express = require('express')
const {validateSigUpData} = require('../utils/validation')
const User = require("../models/user")
const bcrypt = require("bcrypt")

const authRouter = express.Router() //Creating a router

authRouter.post("/signup", async(req,res)=>{
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

authRouter.post("/login", async(req,res) =>{
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

module.exports = authRouter