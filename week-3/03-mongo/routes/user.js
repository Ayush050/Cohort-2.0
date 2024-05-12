const { Router } = require("express");
const mongoose=require('mongoose');
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course}= require('../db');

// User Routes
router.post('/signup', async (req, res) => {
   const username=req.body.username;
   const password=req.body.password;  



        const user=new User({
            username:username,
            password:password
        })

        await user.save();
      
        res.json({
            message:"User is created"
        })
  });

router.get('/courses', async (req, res) => {
        const response=await Course.find({});
        res.json({
            courses:response
        })
        });

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;
      await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
      })

      res.json({
           message:"purchase completed"
        
      })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
     const username=req.headers.username; 
     const user=await User.findOne({
        username:username
     }) 

     const course=await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
     })
     res.json({
        courses:course
     })
});

module.exports = router