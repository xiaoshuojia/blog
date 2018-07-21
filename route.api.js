var express = require('express');
var router = express.Router();
var PostModel = require('./models/post');
var db = require('./models/post');

/* GET posts list . */
router.get('/posts/list', function(req, res, next) {
  var id = 5;
  // Find post by id
  const post = db.get('posts')
  .find({id: id})
  .value();
  console.log(`post.id: ${post.id}\n post.title: ${post.title}\n post.content: ${post.content}`);
  res.json({PostsList: ['文章1', '文章2', '文章3']});
});

router.post('/posts', function(req, res, next){
  console.log("post create information");
  console.log('title:' + req.body.title);
  console.log('content: ' + req.body.content);
  var title = req.body.title;
  var content = req.body.content;

  if (title === '' || content === '')
  {
    console.log('标题或者内容不同为空');
    // return next('标题或者内容不同为空');
    // 返回一个错误提示
    res.send({success: false, err: '标题或者内容不同为空'});
  }
  var id = db.get('count').value();
  console.log(`article id: ${id}`);
  // Increment count
  db.update('count', n => n + 1)
    .write();

  var newID = db.get('count').value();
  console.log(`new ID: ${newID}`);
  db.get('posts')
  .push({ id: newID, title: title, content: content})
  .write();

  var post = db.get('posts')
  .find({id: newID})
  .value();
  console.log(`post.id ${post.id}\n post.title: ${post.title}\n post.content: ${post.content} `);
  res.json({post: post});

});

// get posts
router.get('/posts', function(req, res, next){
  // Get posts from MongoDb
  console.log('Get posts from MongoDb');
  var posts = db.get('posts').value();
  console.log(`posts: ${posts}\n `);
  res.json({success: true, PostsList: posts});
});

// get on specific article
router.get('/posts/:id', function(req, res, next){
  // var id = req.query.id;
  var id = req.params.id;
  console.log('post/:id = ', id);
  PostModel.findOne({_id: id}, function(err, post){
    if (err){
      console.log('can not find the article');
      // res.json({success: false});
      next(err);
      return;
    };
    console.log('find the article');
    res.json({success: true, post});
  });
});

// post edit ariticle
router.patch('/posts', function(req, res, next){
  var id = req.body.id;
  var title = req.body.title;
  var content = req.body.content;

  PostModel.findOneAndUpdate({_id: id}, {title, content}, function(err){
    if (err){
      // res.json({success: false});
      next(err);
      return ;
    }
    res.json({success: true});
  });
});

module.exports = router;
