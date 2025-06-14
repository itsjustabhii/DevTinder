const adminAuth = (req,res,next) =>{
    const token = "ihjbcywdu&jwknc*$njewcn$"
    const isAdminAuthorised = token === "xyz"
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised Request")
    } else {
        next()
    }
}

const userAuth = (req,res,next) =>{
    const token = "ihjbcywdu&jwknc*$njewcn$"
    const isUserAuthorised = token === "xyz"
    if(!isUserAuthorised){
        res.status(401).send("Unauthorised Request")
    } else {
        next()
    }
}

module.exports = {
    adminAuth, userAuth
}