const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //creates a link between connectionrequest table and user table
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: { //used to add validation for a specific field
            values:["ignore", "interested", "accepted", 'rejected'],
            message: `{VALUE} is incorrect status type`
        }
    },
    timestamps:true,
})

//Indexing -> makes querying very fast
connectionRequestSchema.index({fromUserId: 1, toUserId:1})

//Validation to prevent user from sending request to themself
//checks before storing any value in DB
connectionRequestSchema.pre("save", function() {
    const connectionRequest = this
    //check if fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself!")
    }
    next()
})

//Creating a model
const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest", connectionRequestSchema
)

module.exports = ConnectionRequestModel