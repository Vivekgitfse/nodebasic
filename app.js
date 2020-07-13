const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const _ = require('lodash');
const blogRoutes = require('./routes/blogRoutes');
const blogController = require('./controller/blogController');
//const { urlencoded } = require('body-parser');
//const { urlencoded } = require('body-parser');
const app = express();

const dbURI =
  'mongodb+srv://vivekneo:Neocaptan08@cluster0.qowtq.mongodb.net/New?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/*app.use((req, res, next)=>{
    console.log('Middlewars is running');
    console.log('host: ',req.hostname);
    console.log('path: ',req.path);
    console.log('method: ',req.method);
    next();

});*/

/*app.get('/',(req,res)=>{
    const blogs=[
        {title: 'Welcome', snippet: 'Please wash your hands'},
        {title: 'Intro', snippet: 'Please take your seats'}
    ]
    res.render('index',{title:'Home',blogs});
});*/
app.get('/', blogController.blog_index);

app.get('/about', blogController.blog_about);

app.use(blogRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
