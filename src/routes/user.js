const express = require('express')
const { userAuth } = require('../middleswares/auth')
const connectionRequest = require('../models/connectRequest')
const userRouter = express.Router()

const USER_SAFE_DATA = ["firstName", "lastName", "about", "age", "photoUrl", "gender", "skills"]

//Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async(req,res) =>{
    try {
        const loggedInUser = req.user
        const connectionRequests = await connectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "about", "age", "photoUrl", "gender", "skills"]) //maps the user ID to user name and displayed the fields written in array
    } catch (err) {
        req.statusCode(400).send("ERROR: " + err.message)
        

    }
})

//Get connections of the user
userRouter.get("/user/connections", userAuth, async(req, res) =>{
    try {
        const loggedInUser = req.user
        const connectionRequests = await connectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId
        })
        res.json({data: connectionRequests })
    } catch (err) {
        res.status(400).send({message: "ERROR: " + err.message})
    }
})

module.exports = userRouter