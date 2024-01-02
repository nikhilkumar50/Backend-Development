const Blog=require('../models/blog');
const Comment = require('../models/comment');

exports.handleAddNewBlog=async(req,res)=>{
    const{title,body}=req.body;
    const blog=await Blog.create({
        body,
        title,
        createdBy:req.user._id,
        coverImageURL:`/uploads/${req.file.filename}`,
    })

    return res.redirect(`/blog/${blog._id}`);
}

exports.handleIndiviualBlog=async(req,res)=>{
    const blog=await Blog.findById(req.params.id).populate("createdBy");
    const comments=await Comment.find({blogId:req.params.id}).populate("createdBy");

    
    
    return res.render("blog",{
        user:req.user,
        blog,
        comments,
    });
}

exports.handleIndividualComment=async(req,res)=>{
    

    const comment=await Comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user._id,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
     
}
