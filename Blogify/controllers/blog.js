const Blog=require('../models/blog');

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
    const blog=await Blog.findById(req.params.id);
    console.log(blog);
    return res.render("blog",{
        user:req.user,
        blog,
    });
}
