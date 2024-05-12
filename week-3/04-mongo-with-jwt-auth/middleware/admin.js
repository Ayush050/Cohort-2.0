
const mongoose=require('mongoose');
const {Admin}=require('../db');

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const username=req.headers.username; 
    
    const exist=await Admin.findOne({
        username:username
    }) 
    if(!exist){
        res.status(403).json({
            msg:"Admin doesnt exist"
        })
    } 
    else {
        next();
    }
}

module.exports = adminMiddleware;