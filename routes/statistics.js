var express = require('express');
var router = express.Router();
var Posts = require('../models/posts.model');
var Statistics = require('../models/statistics.model');


router.get('/topcreators', async (req, res) => {

  //get all posts
  Posts.find( async (err, posts) => {

    //Handel errors while getting data
    if (err) {
      res.status(400).send(err)
    } else {
      try {
        let creatorsSorted = {}

        // create an object with the number of posts for every user
        await Promise.all(posts.map((post) => {
          username = post.username
          if (creatorsSorted[username]) {
            return creatorsSorted[username] = creatorsSorted[username] + 1
          } else {
            return creatorsSorted[username] = 1
          }
        }))
        
        //sort and slice the object as requested
        const sortable = Object.fromEntries(
          Object.entries(creatorsSorted).sort(([,a],[,b]) => b-a).slice(0,10)
        );

        //return response with data
        res.status(200).send(sortable)
      } catch (e) {

        //catch error while converting the data
        res.status(400).send(e)
      }
    }
  })
})

router.get('/runtimes', async (req, res) => {
  Statistics.find({}, async (err, stats) => {

    //Handel errors while getting data
    if (err) {
      res.status(400).send(err)
    } else {
      try {
        let data = {}

        //function that returns average of array
        const average = (arr) => arr.reduce((a,b) => a + b, 0) / arr.length;
  
        // made an object with array to every function
        await Promise.all(stats.map((key) => {
          let funcName = key.functionName
          let time = key.time / 1000
          if (data[funcName]) {
            data[funcName] = [...data[funcName], time]
          } else {
            data[funcName] = [time]
          }
        }))
  
        //made an average to every function
        const averageForFunctions = Object.keys(data).map((functionName) => {
          return {functionName: average(data[functionName]).toFixed(4)}
        })
        res.status(200).json(averageForFunctions)
      } catch (e) {
        //catch error while converting the data
        res.status(400).send(e)
      }
    }
  })
})
module.exports = router;