const validator = require('validator')

const validateSigUpData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body
    if(!firstName || !lastName){
        throw new Error('Enter a valid name')
    } else if (!validator.isEmail(emailId)){
        throw new Error('Enter valid email address')
    } else if(!validator.isStrongPassword(password)){
        throw new Error('Enter a strong password!')
    }
}

module.exports = {validateSigUpData}