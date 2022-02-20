var express = require('express');
var router = express.Router();
var Posts = require('../models/posts.model');
var Statistics = require('../models/statistics.model');

router.get('/', async (req, res) => {
  //start time for statistics
  const start = Date.now();

  // finding only first 10 posts (chunck size per call) and sorting by create time
  Posts.find({}).sort( '-createdAt' ).limit(10).exec({}, (err, posts) => {
    
    //Handel errors while getting data
    if (err) {
      res.status(400).send(err)
    } else {
      res.json(posts)
    }

    //end time for statistics and create new //start time for Statistic field
    const duration = Date.now() - start;
    const newStat = new Statistics({functionName: "getAllPosts", time: duration})
    newStat.save()
  })
})

router.post('/', async (req, res) => {
  //start time for statistics
  const start = Date.now();
  //get the data from request and creating new post object
  const post = new Posts(req.body);
  try {

    //save new post and return respone 
    await post.save();
    res.status(200).send("Post Created!");
  } catch (e) {

    //catch errors while creating new post
    res.status(400).send(`Cannot create post, ${e}`);
  }

  //end time for statistics and create new //start time for Statistic field
  const duration = Date.now() - start;
  const newStat = new Statistics({functionName: "createNewPost", time: duration})
  newStat.save()
})

module.exports = router;