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

const validateEditProfileData = (req) =>{
    const allowedEditFields = ["firstname", "lastname", "emailId", "photoUrl", "gender","age", "about", "skills"]

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field))

    return isEditAllowed
}

module.exports = {validateSigUpData, validateEditProfileData}