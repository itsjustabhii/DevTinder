const express = require('express')

const app = express()
const {adminAuth} = require("./middleswares")

//Handle Auth middleware for all GET,POST,... request
app.use("/admin", adminAuth)

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