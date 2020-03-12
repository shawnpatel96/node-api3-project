const express = require('express');
const userRouter = require('./users/userRouter');
const helmet = require('helmet')

const server = express();

server.use(helmet());
server.use(logger)
server.use(express.json())

server.use('api/user', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
 //log info about request to console like  morgan --> for GET to "/"
 const method = req.method;
 const endpoint=req.originalUrl;
 console.log(`${method} to ${endpoint}`);
 next(); // moves request to the next middleware

}

module.exports = server;
