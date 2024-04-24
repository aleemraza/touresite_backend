const Register = require('../DBModel/registerModel')
exports.CreateRegister = async(req,res)=>{
    try{
        const create = await Register.create(req.body)
        res.status(200).json({
            status: "sccuess",
            data:{
                user:create
            }
        })
    }catch(error){
        res.status(404).json({
            status:"Failed",
            message:error
        })
    }
}
exports.getAllRegister = async(req,res)=>{
    try{
        const getuser = await Register.find()
        res.status(200).json({
            status: "sccuess",
            results : getuser.length,
            data:{
                user:getuser
            }
        })
    }catch(error){
        res.status(404).json({
            status:"Failed",
            message:error
        })
    }
}
exports.getRegister = async(req,res)=>{
    try{
        const data = await Register.findById(req.params.id)
        res.status(200).json({
            status:"sccuess",
            data:{
                data
            }
        })
    }catch(error){
        res.status(404).json({
            status:"Failed",
            message:error
        })
    }
}
exports.updateRegister = async(req,res)=>{
    try{
        const updateuser = await Register.findByIdAndUpdate(req.params.id, req.body,{
            new : true,
            runValidators:true
        })
        res.status(200).json({
            status:"seccuess",
            data:{
                updateuser
            }
        })  
    }catch(error){
        res.status(500).json({
            status:"Failed",
            message:"route under developed"
        })
    }
}
exports.deleteRehister = async(req,res)=>{
    try{
        await Register.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:"seccuss",
            data:null
        })
    }catch(error){
        res.status(500).json({
            status:"Failed",
            message:error
    })
    }
}