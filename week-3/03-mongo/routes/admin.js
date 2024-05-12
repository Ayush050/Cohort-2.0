const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const username=req.body.username;
    const password=req.body.password; 
   
      const newAdmin=new Admin({
        username:username,
        password:password
      }) 
      await newAdmin.save();

      res.json({
            message:"Admin created successfully"
         })

});

router.post('/courses', adminMiddleware, async (req, res) => {
 
    const title=req.body.title;
    const description=req.body.description;
    const price=req.body.price;
    const imageLink=req.body.imageLink;

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message:"Course created successfully",
        courseId:newCourse._id
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    
      const response=await Course.find({});
      res.json({
        courses:response
      })
});

module.exports = router;