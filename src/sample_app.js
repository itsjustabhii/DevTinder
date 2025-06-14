//ExpressJS is a NodeJS framework. 

const express = require('express')

const app = express()

//Request handler -> Order of Routes matters in execution

//app.get -> route only matches API calls with /user
app.get("/user/:userId/:password/:name", (req,res)=>{
    console.log(req.params)
    res.send({firstName:'Abhishek', lastName:'Harish'})
})

//app.post
app.post("/user", (req,res)=>{
    res.send("Saved data to Database!")
})

//app.delete
app.delete("/user", (req,res)=>{
    res.send("Deleted data successfully!")
})

//app.use -> route matches with all API calls
app.use("/test", (req,res)=>{
    res.send('Hello from the Server')
})


app.listen(3000, () => {
    console.log("Server is successfully listening on PORT 3000...")
})