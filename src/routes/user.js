const express = require('express')
const { userAuth } = require('../middleswares/auth')
const connectionRequest = require('../models/connectRequest')
const userRouter = express.Router()

//Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async(req,res) =>{
    try {
        const loggedInUser = req.user
        const connectionRequests = await connectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        })
    } catch (err) {
        req.statusCode(400).send("ERROR: " + err.message)
        

    }
})

module.exports = userRouter