var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
var marked = require('marked');
var MarkdownIt = require('markdown-it');
var md = new MarkdownIt();
var db = require('./models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("Get / page");
  res.render('index', { title: 'My first web app' });
});

// GET users page
router.get('/users', function(req, res, next){
    console.log('Get /users page');
    res.send("zhangsan\n lisi\n wangerwangzi");
});

// GET posts page
router.get('/posts', function(req, res, next){
    console.log('Get posts page');
    res.render('posts', {title: 'Hello posts'});
});


// GET create page
router.get('/posts/create', function(req, res, next){
    console.log("Get create page");
    res.render('create', {title: 'create'});
});


// GET the specific ariticle content
router.get('/posts/show', function(req, res, next){
  var searchid = req.query.id;
  var id = Number(searchid);

  console.log(`searchidtype: ${typeof(searchid)} \nsearchid: ${searchid}\n idtype: ${typeof(id)} id: ${id}`);
  var post = db.get('posts')
  .find({id: id})
  .value();
  console.log(`post.id ${post.id}\n post.title: ${post.title}\n post.content: ${post.content} `);
  // article.content = md.render(article.content);
  res.render('show', {article: post});

});

// get edit page
router.get('/posts/edit', function(req, res, next){
  var id = req.query.id;

  res.render('edit', { id });

});


module.exports = router;
