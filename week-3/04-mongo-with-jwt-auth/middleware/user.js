
const mongoose=require('mongoose');
const {User}=require('../db');

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected 

    const username=req.headers.username;
     const exist=await User.findOne({
        username:username
     }) 

     if(!exist){
        res.status(403).json({
            msg:"User doesnt exit"
        })
     } 
     else {
        next();
     }

}

module.exports = userMiddleware;