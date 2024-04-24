const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    author:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required: true
    },
    comments:{
        type:String,
    },
    date:{
        type: Date, 
        default: Date.now 
    },
    hidden:{
        type:Number,
    }
})

const blogModel = mongoose.model('blog' , blogSchema)
module.exports = blogModel