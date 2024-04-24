const mongoose = require('mongoose')
const validator = require('validator')
//const User = require('./userModel')
const ToureSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A Toure Must Have Name'],
        unique:true,
        trim:true,
        maxlength:[40,'the 40 character are required'],
        minlength:[10,'the 40 character are required'],
        validate: [validator.isAlpha ,'validator conatined only characters']
    },
    duration:{
        type:Number,
        required:[true, 'A Toure Must Have Duration'],   
    },
    maxGroupSize:{
        type:Number,
        required:[true, 'A Toure Must Have MX Group Size'],   
    },
    difficulty:{
        type:String,
        required:[true, 'A Toure Must Have deficulty'],   
    },
    ratingsAverage:{
        type:Number,
        default:4.5,
        min:[1,"the rating less then 1"],
        max:[5,"the rating less then 5"],
        set : val=> Math.round(val * 10) / 10
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true , 'A toure Must Have Price ']
    },
    priceDiscount:{
       type: Number,
       validate:{
          validator: function(val){
            return val < this.price
           },
        message:"discount price({VALUE}) below then the regural price"
       }
       
    },
    summary:{
        type:String,
        trim: true 
    },
    description:{
        type:String,
        trim: true 
    },
    imageCover:{
        type:String,
        required:[true , "image must be uploaded"]
    },
    images: [String],
    createAt:{
        type:Date,
        default: Date.now()
    },
    startDates : [Date],
    startLocation:{
        //jeo jason
        type:{
            type:String,
            default:'Point',
            enum: ['Point']
        },
        coordinates:[Number],
        address:String,
        description:String,
    },
    location:[
        {
            type:{
                type:String,
                default:'Point',
                enum: ['Point']
            },
            coordinates:[Number],
            address:String,
            description:String,
            day: Number
        }
    ],
    guides : [
        {
            type: mongoose.Schema.ObjectId,
            ref:'User'
        }
    ],
},
{
    toJSON:{virtuals:true},
    toObject: {virtuals:true}
}


);

//ToureSchema.pre('save', async function(next){
    //const guidesPromise = this.guides.map(async id => await User.findById(id))
    //this.guides = await Promise.all(guidesPromise)
    //next()
//});
ToureSchema.pre(/^find/, function(next){
    this.populate({
        path:'guides',
        select:'-__v -passwordChangeAt'
    })
    next()

});
//conected other fields 
// Virtual populate
ToureSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
  });
const Toure = mongoose.model('Toure', ToureSchema)
module.exports = Toure ;