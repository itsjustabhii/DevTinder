const express = require('express')
const { userAuth } = require('../middleswares/auth')
const connectionRequest = require('../models/connectRequest')
const userRouter = express.Router()
const User = require("../models/user")

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

//Feed API to display the accounts in the feed
userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        /* User must see all the cards except
        - his own card
        - his connections
        - ignored people
        - those who he has already sent connection request 
        */
       const loggedInUser = req.user

       //Obtain page number from the user request
       const page = parseInt(req.query.page) || 1
       let limit = parseInt(req.query.limit) || 10

       limit = limit > 50?50 : limit
       const skip = (page-1)*limit

       //Find all connection requests (sent + received)
       const connectionRequests = await connectionRequest.find({
        $or:[{fromUserId:loggedInUser._id}, {toUserId: loggedInUser._id} ]
       })
       .select("fromUserId, toUserId" )
       .populate("fromUserId", "firstName")
       .populate("toUserId", "firstName")

       const hideUsersFromFeed = new Set() //to hide the users from appearing again
       connectionRequests.forEach(req => {
        hideUsersFromFeed.add(req.fromUserId.toString())
        hideUsersFromFeed.add(req.toUserId.toString())
       })

       console.log(hideUsersFromFeed)

       const users = await User.find({
        $and: [
            {_id: {$nin: Array.from(hideUsersFromFeed)}},
            {_id: {$ne: loggedInUser._id}}
        ]
       }).select(USER_SAFE_DATA).skip(skip).limit(limit)
        
       res.send(users)
    } catch (err) {
        res.status(400).send({Message : "ERROR: " + err.message})
    }
})

module.exports = userRouter