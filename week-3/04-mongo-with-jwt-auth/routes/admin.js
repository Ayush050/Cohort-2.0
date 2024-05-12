const { Router } = require("express");
const mongoose=require('mongoose');
const adminMiddleware = require("../middleware/admin");
const router = Router(); 
const {Admin,Course}=require('../db');
const jwt=require('jsonwebtoken');
const jwtPassword="ABC";

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic 
    const username=req.body.username;
    const password=req.body.password; 

    const newAdmin=new Admin({
        username:username,
        password:password
    }) 
    await newAdmin.save();  

    res.json({
        msg:"Admin created successfully"
    })

});

router.post('/signin', async (req, res) => {
     const username=req.body.username; 
     const password=req.body.username;
    
     const exist=await Admin.findOne({
        username:username
     }) 
     if(!exist){
        res.status(403).json({
            msg:"incorrect username or password"
        })
     } 
     else {
        var token = jwt.sign({ username: username }, jwtPassword);
        return res.json({ token });

     }
});

router.post('/courses', adminMiddleware, async (req, res) => { 

     const title=req.body.title; 
     const description=req.body.description; 
     const imageLink=req.body.imageLink; 
     const price =req.body.price; 

      const token=req.headers.authorization; 
      const verify=jwt.verify(token,jwtPassword);
      if(!verify){
        res.status(403).json({
            msg:"user is not verified"
        })
      } 
      else {
          const newCourse=new Course({
            title,
            description,
            imageLink,
            price
          }) 
          await newCourse.save(); 
          res.json({
            msg:"course created successfully",
            CourseID:newCourse._id
          })
      }
});

router.get('/courses', adminMiddleware, async (req, res) => {
      
    const token=req.headers.authorization; 
    const verify=jwt.verify(token,jwtPassword); 

    if(!verify){
        res.status(403).json({
            msg:"invalid token"
        })
    } 
    else {
        const courses=await Course.find({}); 
        res.json({
            courses
        })
    }
});

module.exports = router;