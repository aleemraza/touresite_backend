const mongoose = require('mongoose')


const Register_Model = mongoose.Schema({
    email:{
        type:String,
        index:{unique:true}
    },
    username:{
        type :String,
        required:true
    },
    name:{
        type :String,
        required:true
    },
    password:{
        type :String,
        required:true
    }
    
})


const Register  = mongoose.model('Register', Register_Model)

module.exports = Register;