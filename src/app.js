//ExpressJS is a NodeJS framework. 

const express = require('express')

const app = express()

//Request handler -> Order of Routes matters in execution

//app.get -> route only matches API calls with /user
app.get("/user", (req,res)=>{
    res.send({firstName:'Abhishek', lastName:'Harish'})
})

//app.use -> route matches with all API calls
app.use("/test", (req,res)=>{
    res.send('Hello from the Server')
})


app.listen(3000, () => {
    console.log("Server is successfully listening on PORT 3000...")
})