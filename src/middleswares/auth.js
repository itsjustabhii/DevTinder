export const adminAuth = (req,res,next) =>{
    const token = "ihjbcywdu&jwknc*$njewcn$"
    const isAdminAuthorised = token === "xyz"
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised Request")
    } else {
        next()
    }
}