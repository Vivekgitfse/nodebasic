const express=require('express');
const Blog = require('../models/blog');
const mongoose=require('mongoose');
const router=express.Router();

router.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title:'New Blog4',
        snippet:'New Blog created',
        body: 'More about new blog'
    });
    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    });
})
router.get('/blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.render('index',{title:'All Blogs',blogs:result})

    })
    .catch((err)=>{
        console.log(err);
    });
});
router.post('/blogs',(req,res)=>{
    //console.log(req.body);
    const blog=new Blog(req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/blogs');

    })
    .catch((err)=>{
        console.log(err);
    });
})
router.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'Create'});
});
router.get('/blogs/:id', (req, res) => {
    
    Blog.findById(mongoose.Types.ObjectId(req.params.id))
      .then(result => {
        res.render('details', {blog: result, title:'Blog Details'});
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  router.delete('/blogs/:id', (req, res) => {
    //const id = ;
    
    Blog.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id))
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });

  module.exports=router;