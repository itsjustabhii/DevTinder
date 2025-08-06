const express = require('express')
const {userAuth} = require("../middleswares/auth")
const profileRouter = express.Router()
const {validateEditProfileData} = require("../utils/validation")

profileRouter.get("/profile/view", userAuth, async(req, res)=>{
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

profileRouter.patch('/profile/edit', userAuth, async(req, res) => {
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request")
        }
        const loggedInUser = req.user

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))

        await loggedInUser.save()
        res.send("Profile updated successfully!")
    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }

})

module.exports = profileRouter