const express = require('express')

const app = express()
const {adminAuth, userAuth} = require("./middleswares/auth")

//Handle Auth middleware for all GET,POST,... request
app.use("/admin", adminAuth)

app.post("/user/login",(req,res)=>{
    res.send("User logged in successfully!")
})

app.get("/user",userAuth, (req,res)=>{
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