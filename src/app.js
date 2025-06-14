const express = require('express')

const app = express()

//Handle Auth middleware for all GET,POST,... request
app.use("/admin",(req,res,next) =>{
    const token = "ihjbcywdu&jwknc*$njewcn$"
    const isAdminAuthorised = token === "xyz"
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised Request")
    } else {
        next()
    }
})

app.get("/user",(req,res)=>{
    res.send("User Data Sent!")
})

//Only if Authorisation completes, /admin executes
app.get("/admin/getAllData", (req,res)=>{
    res.send("All data sent")
})

app.get("/admin/deleteUser", (req,res)=>{
    res.send("Delete a user!")
})

app.listen(3000, ()=>{
    console.log("Server is successfully listening on PORT 3000...")
})