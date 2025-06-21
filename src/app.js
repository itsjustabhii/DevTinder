const express = require('express')
const connectDB = require("./config/database")
const app = express()
const User = require("./models/user")
// const {adminAuth, userAuth} = require("./middleswares/auth")

app.use(express.json())

app.post("/signup", async(req,res)=>{
    //Creating new instance of a user
    const user  = new User ({
        firstName: 'Rafael',
        lastName: 'Nadal',
        emailId: 'nadal@gmail.com',
        password: 'nadal@123'
    })
    
    await user.save()
    res.send('User data added!')
})


connectDB().then(()=>{
    console.log('Database connection successful!')
    app.listen(3000, ()=>{
    console.log("Server is successfully listening on PORT 3000...")
})
})
.catch((err)=>{
    console.error('Database cannot be connected', err.message)
})

// //Handle Auth middleware for all GET,POST,... request
// app.use("/admin", adminAuth)

// app.post("/user/login",(req,res)=>{
//     res.send("User logged in successfully!")
// })

// app.get("/user",userAuth, (req,res)=>{
//     res.send("User Data Sent!")
// })

// app.get("/user/getAllData", (err,req,res,next)=>{
//     try{
//         //code to connect to DB and return back
//         throw new Error("infienfif")
//         res.send("User data sent!")
//     }
//     catch(err)
//     {
//         res.status(500).send("Something went wrong!")
//     }
// })

// //Only if Authorisation completes, /admin executes
// app.get("/admin/getAllData", (req,res)=>{
//     res.send("All data sent")
// })

// app.get("/admin/deleteUser", (req,res)=>{
//     res.send("Delete a user!")
// })



