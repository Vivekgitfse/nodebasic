const Blog = require('../models/blog');

const blog_index=(req,res)=>{
    res.redirect('/blogs');
}

const blog_about=(req,res)=>{
    res.render('about',{title:'About'});
}

module.exports={
    blog_index,
    blog_about
}