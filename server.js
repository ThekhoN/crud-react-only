var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

//db
mongoose.connect('mongodb://jackquarry:root@ds137230.mlab.com:37230/comments');

app.use(bodyParser.urlencoded({extended: true}));
var Comment = require('./model/comments');
app.use(bodyParser.json());

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function(req, res){
  res.json({ message: 'API Initialized'});
});
router.route('/comments')
  .get(function(req, res){
    Comment.find(function(err, comments){
      if(err){
        res.send(err);
      }
      res.json(comments);
    });
  })
  .post(function(req, res){
    var comment = new Comment();
    comment.author = req.body.author;
    comment.text = req.body.text;
    comment.save(function (err) {
      if(err){
        res.send(err);
      }
      res.json({
        message: 'Comment successfully added!'
      });
    });
  });

router.route('/comments/:comment_id')
.put(function(req, res){
  Comment.findById(req.params.comment_id, function(err, comment){
    if(err){
      res.send(err);
    }
      //comment is what we received from db
      //check if similar else post
      comment.author = req.body.author === comment.author ? comment.author : req.body.author;
      comment.text = req.body.text === comment.text ? comment.text : req.body.text;
      comment.save(function(err){
        if(err){
          res.send(err);
        }
        res.json({message: 'Comment has been updated'});
      });
    });
  })
  .delete(function(req, res){
    Comment.remove({_id: req.params.comment_id}, function (err, comment) {
      if(err){
        res.send(err);
      }
      res.json({ message: 'Comment has been deleted' });
    });
  });

app.use('/api', router);

app.listen(port, function(){
  console.log('api running on port ' + port);
});
