const blogModel = require('../DBModel/blogModel')
exports.createBlog = async(req,res)=>{
    if (!req.body.name && !req.body.author && !req.body.body && !req.body.comments && !req.body.date && !req.body.hidden){
        res.status(400).json({ 
            message: "Content can not be empty!" 
        });
    }
    const Blog_Data = new  blogModel({
        name:req.body.name,
        author:req.body.author,
        body:req.body.body,
        comments:req.body.comments,
        date:req.body.date,
        hidden:req.body.hidden,
    })
    await Blog_Data.save().then(data =>{
        res.status(200).json({
            status:"Data Saved",
            blog: data
        })
    }).catch(error=>{
        res.status(500).json({
            status:"Data Saved",
            message: error.message || "Some error occurred while creating User Blog"
        })
    })
}
exports.updateBlog = async(req,res)=>{
    if(!req.body){
        res.status(404).json({
            message: 'Data to update can not be empty!'
        })
    }
    const id = req.params.id 
    await blogModel.findByIdAndUpdate(id, req.body,{useFindAndModify: false })
    .then(data =>{
        if(!data){
            res.status(404).json({
                message: 'User Not Found'
            })
        }else{
            res.status(404).json({
                message: 'User updated successfully.'
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
}
exports.getBlog = async(req,res)=>{
    try{
        const oneuser = await blogModel.findById(req.params.id)
        res.status(200).json({
            status:"All Blog Data",
            oneuser
        })
    }catch(error){
        res.status(404).json({
            status:"Faild to load",
            message: error.message||'User not Found'
        })

    }

}
exports.getallBlog = async(req,res)=>{
    try{
        const blog_data = await blogModel.find();
        res.status(200).json({
            status:"All Blog Data",
            blog_data
        })
    }catch(error){
        res.status(404).json({
            status:"Faild to load",
            message: error.message||'User not Found' 
        })
    }
    
}
exports.deleteBlog = async(req,res)=>{
    await blogModel.findByIdAndDelete(req.params.id)
    .then(data =>{
        if(!data){
            res.status(404).json({
                message:'User not Found' 
            })
        }else{
            res.json({
                message: "User deleted successfully!"
              });
        }
    }).catch(error=>{
        res.status(500).json({
            status:"Faild to load",
            message: error.message
        })  
    })
}