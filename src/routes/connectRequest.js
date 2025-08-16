const express = require('express')
const {userAuth} = require("../middleswares/auth")
const connectionRequest = express.Router()
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

connectionRequest.post("/request/send/:status/:toUserId", userAuth, async(req, res) =>{
    try {
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status

        //to validate the status of a profile
        const allowedStatus = ['ignored', 'interested']
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status type: " + status})
        }

        //to check if the other user exists in DB before sending interested/ignored status
        const toUser = await User.findbyId(toUserId)
        if(!toUser){
            return res.status(404).json({message: "User not found!"})
        }

        //check if a connection request already exists between two parties
        const exisitingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId:toUserId, toUserId:fromUserId},
            ],
        })
        if(exisitingConnectionRequest){
            return res.status(400).json({message: "Connection request already exists!"})
        }
        
        //creating new instance
        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        })
        const data = await connectionRequest.save()
        res.json({
            message: req.user.firstName+ " is " + status + " in " + toUser.firstName,
            data,
        })
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }

})

module.exports = connectionRequest