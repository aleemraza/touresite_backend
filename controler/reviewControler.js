const ReviewDB = require('../DBModel/reviewModel')

exports.createReview = async(req,res)=>{
    try{
        if(!req.body.tour) req.body.tour = req.params.tourId
        if(!req.body.user) req.body.user = req.user.id
        const createreview = await ReviewDB.create(req.body)
        res.status(200).json({
            status:"success",
            data:{
                review: createreview
            }
        })
    }catch(err){
        res.status(404).json({
            status:"Failed",
            message: err
        })
    }
}
exports.getAllReview = async(req,res)=>{
    try{
        let filter = {}
        if(req.params.tourId) filter = {tour:req.params.tourId}
        console.log(filter)
        const getallreview = await ReviewDB.find(filter)
        //console.log(getallreview)
        res.status(200).json({
            status:'success',
            data:{
               review:getallreview
            }
        })
    }catch(err){
        res.status(404).json({
            status:"Failed",
            message: err
        })
    }
    
}
exports.getReview = async(req,res)=>{
    try{
        const getreview = await ReviewDB.findById(req.params.id)
        if(!getreview){
            res.status(204).json({status:'success', message:"user does not exist"})
        }
        res.status(200).json({
            status:'success',
            data:{
               review:getreview
            }
        })
    }catch(err){
        res.status(404).json({
            status:"Failed",
            message: err
        })
    }
    
}
exports.updateReview = async(req,res)=>{
    try{
        const updatereview = await ReviewDB.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators:true
        })
        res.status(200).json({
            status:'success',
            data:{
                updatereview
            }
        })
    }catch(err){
        res.status(404).json({
            status:"Failed",
            message: err
        })
    }
}
exports.deleteReview = async(req,res)=>{
    try{
       await  ReviewDB.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:'success',
            data:null
        })   
    }catch(err){
        res.status(404).json({
            status:"Failed",
            message: err
        })

    }
    
}