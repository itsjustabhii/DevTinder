const jwt = require("jsonwebtoken")
const User = require("../models/user")


const adminAuth = (req,res,next) =>{
    const token = "ihjbcywdu&jwknc*$njewcn$"
    const isAdminAuthorised = token === "xyz"
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised Request")
    } else {
        next()
    }
}

// const userAuth = (req,res,next) =>{
//     const token = "ihjbcywdu&jwknc*$njewcn$"
//     const isUserAuthorised = token === "xyz"
//     if(!isUserAuthorised){
//         res.status(401).send("Unauthorised Request")
//     } else {
//         next()
//     }
// }

const userAuth = async(req, res, next) =>{
    try {
        //Read the token from req cookies
    const {token} = req.cookies
    if(!token){
        throw new Error("Token doesn't exists!")
    }

    //Validate the token
    const decodeData = await jwt.verify(token, "DEV@Tinder$666")

    //Find the User
    const {_id} = decodeData
    const user = await User.findById(_id)
    if(!user){
        throw new Error("User not found!")
    }
    req.user = user //Whatever user found on the database, is attached to the reqeust and sent to next step
    next()
    } catch (err) {
        res.status(400).send("ERROR: "+ err.message)
    }
    

}

module.exports = {
    adminAuth, userAuth
}