const express = require('express')

const app = express()

app.use("/user",(req,res) =>{
    res.send("Route Handler 1")
})

app.listen(3000, ()=>{
    console.log("Server is successfully listening on PORT 3000...")
})