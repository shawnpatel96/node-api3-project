const express = require('express');
const userDb= require('./userDb');
const postDb=require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  userDb.insert(req.body)
  .then(newUser=>{
    res.status(201).json(newUser)
  })
  .catch(err=>{
    res.status(500).json({message:"New User could not be added" , err})
  })
});

router.post('/:id/posts',validatePost, (req, res) => {
  // do your magic!
  postDb.insert(req.body)
  .then(newPost=>{
    res.status(201).json(newPost)
  })
  .catch(error=>{
    res.status(500).json({message: 'New Post could not be added',error})
  })
});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get(req.query)
  .then(user=>{
    res.status(200).json(user)
  })
  .catch(err=>{
    res.status(500).json({message: "Error getting the users",err})
  })
});

router.get('/:id',validateUserId, (req, res) => {
  // do your magic!
  userDb.getById(req.params.id)
  .then(user=>{
    if(user){
      res.status(200).json(user)
    }else{
      res.status(400).json({message:"Invalid User Id Provided"})
    }
  })
  .catch(error=>{
    res.status(500).json({message:"Err getting the User",error})
  })
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // do your magic!
  userDb.getUserPosts(req.params.id)
  .then(posts=>{
    if(posts){
      res.status(200).json(posts)
    }else{
      res.status(400).json({message:'Invalid User Id Provided'})
    }
  })
  .catch(err=>{
    res.status(500).json({message: 'Err getting the user',err})
  })
});

router.delete('/:id', validateUserId,(req, res) => {
  // do your magic!
  userDb.remove(req.params.id)
  .then(user=>{
   if(user >0){
    res.status(200).json({message: 'User has been terminated'})
   }else{
     res.status(400).json({message:'User could not be terminated'})
   }
  })
  .catch(error=>{
    res.status(500).json({message: 'There was an error deleting user',error})
  })
});

router.put('/:id',validateUserId, (req, res) => {
  // do your magic!
  const userInfo = req.body;
  const { id }= req.params;
  userDb.update(id, userInfo)
  .then(user=>{
    if(user >0){
      res.status(200).json({message:'User has been upgraded'})
    }else{
      res.status(400).json({message:'User could not be upgraded'})
    }
  })
  .catch(error=>{
    res.status(500).json({message:'Error updating the user', error})
  })
  
});








//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id= req.params.id
  userDb.getById(id)
  .then(user=>{
    if(user===undefined){
      res.status(400).json({message: 'User doesnt exist'})
    }else{
      next();
    }
  })
  .catch(err=>{
    res.status(500).json({message:'user id not valid', err})
  })
  

}

function validateUser(req, res, next) {
  // do your magic!
  const user=req.body
  if(!user){
    res.status(400).json({message:'Missing Required User Data'})
  } else if (!user.name){
    res.status(400).json({message: 'Missing name field'})
  }else{
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const post=req.body;
  if(!post){
    res.status(400).json({message:'Missing Required Post Data'})
  } else if(!post.name){
    res.status(400).json({message: 'Missing Required Field'})
  } else{
    next();
  }
}

module.exports = router;
