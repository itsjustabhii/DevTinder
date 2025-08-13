const express = require('express')
const {userAuth} = require("../middleswares/auth")
const connectionRequest = express.Router()
const connectionRequest = require("../models/connectionRequest")

connectionRequest.post("/request/send/:status/:toUserId", userAuth, async(req, res) =>{
    try {
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status
        
        //creating new instance
        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        })
        const data = await connectionRequest.save()
        res.json({
            message: "Connection request sent successfully!",
            data
        })
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }

    res.send(user.firstName + " sent connection Request!")
})

module.exports = connectionRequest