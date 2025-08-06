const express = require('express')
const {userAuth} = require("../middleswares/auth")
const profileRouter = express.Router()

profileRouter.get("/profile", userAuth, async(req, res)=>{
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

module.exports = profileRouter