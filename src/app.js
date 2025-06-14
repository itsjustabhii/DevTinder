const express = require('express')

const app = express()

//Handle Auth middleware for all GET,POST,... request
app.use("/admin",(req,res,next) =>{
    const token = "ihjbcywdu&jwknc*$njewcn$"
    const isAuthorised = token === "xyz"
    if(!isAuthorised){
        res.status(401).send("Unauthorised Request")
    }
    res.send("Route Handler 1")
})

app.listen(3000, ()=>{
    console.log("Server is successfully listening on PORT 3000...")
})