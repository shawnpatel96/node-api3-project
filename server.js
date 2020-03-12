const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter=require('./posts/postRouter')
const helmet = require('helmet')

const server = express();

server.use(helmet());
server.use(logger)
server.use(express.json())

server.use('/api/user', userRouter)
server.use('/api/post',postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use(function(req,res,next){
  res.status(404).json({message:"Opps, did not find what you're looking for" })
})

//custom middleware

function logger(req, res, next) {
 //log info about request to console like  morgan --> for GET to "/"
 const method = req.method;
 const endpoint=req.originalUrl;
 console.log(`${method} to ${endpoint}`);
 next(); // moves request to the next middleware

}

module.exports = server;
