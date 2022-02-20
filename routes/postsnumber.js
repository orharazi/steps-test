var express = require('express');
var router = express.Router();
var Posts = require('../models/posts.model')


router.get('/', (req, res) => {
  Posts.count((err, count) => {

    //Handel errors while getting data
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json({"total Posts number" :count})
    }
  })
  
})

module.exports = router;