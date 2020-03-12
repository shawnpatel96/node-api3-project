const express = require('express');
const postDb = require('./postDb')
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  postDb.get()
  .then(posts=>{
    res.status(200).json(posts)
  })
  .catch(error=>{
    res.status(500).json({message: "Error getting the Posts"})
  })
});

router.get('/:id',validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id
  postDb.getById(id)
  .then(post=>{
    res.status(400).json(post)
  })
  .catch(error=>{
    res.status(500).json({message: "Error fetching post with given ID"})
  })
});

router.delete('/:id',validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id
  postDb.remove(id)
  .then(post=>{
    if(post >0){
      res.status(200).json({message: 'Post Deleted'})
    } else {
      res.status(404).json({message: 'Post not Found'})
    }
  })
  .catch(error=>{
    res.status(500).json({message:'The Provided post could not be deleted', error})
  })
});

router.put('/:id',validatePostId, (req, res) => {
  const id = req.params.id
  const postsInfo = req.body
  // do your magic!
  postDb.update(id, postsInfo)
  .then(post=>{
    if(post>0){
      res.status(200).json({message:"The post has been updated"})
    }else{
      res.status(404).json({message:"Post not Found"})
    }
  })
  .catch(error=>{
    res.status(500).json({message:"The specified post could not be updated"})
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const id = req.params.id
    postDb.getById(id)
    .then(post=>{
      if(post===undefined){
        res.status(400).json({message: "Post with provided id does not exist"})
      } else{
        next()
      }
    })
    .catch(error=>{
      res.status(500).json({message: 'Issue retriving post with given id', error})
    })
  }



module.exports = router;
