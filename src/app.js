//ExpressJS is a NodeJS framework. 

const express = require('express')

const app = express()

//Request handler
app.use("/", (req,res)=>{
    res.send('Welcome to Homepage')
})

app.use("/test", (req,res)=>{
    res.send('Hello from the Server')
})

app.use("/hello", (req,res)=>{
    res.send('Hello Homepage')
})

app.listen(3000, () => {
    console.log("Server is successfully listening on PORT 3000...")
})