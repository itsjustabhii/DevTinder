const express = require('express')

const connectionRequest = express.Router()

connectionRequest.post("/sendConnectionRequest", userAuth, async(req, res) =>{
    //Connection request
    console.log("Sending a connection request")

    res.send(user.firstName + " sent connection Request!")
})

module.exports = connectionRequest