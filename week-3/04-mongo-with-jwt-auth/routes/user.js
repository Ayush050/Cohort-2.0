const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user"); 
const {User,Course}=require('../db'); 
const jwt=require('jsonwebtoken');
const jwtPassword="ABC";

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic 
    const username=req.body.username; 
    const password=req.body.password;

    const newUser=new User({
        username:username,
        password:password
     }) 

     await newUser.save(); 

     res.json({
        msg:"User created successfully"
     })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic 

    const username=req.body.username;
    const password=req.body.password;

    const exist=await User.findOne({
        username:username
    }) 

    if(!exist){
        res.status(403).json({
            msg:"User not exist"
        })
    } 
    else {

        var token=jwt.sign({username:username},jwtPassword);  

        res.json({
            token
        })

    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic  
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

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic  

    const token=req.headers.authorization; 
    const verify=jwt.verify(token,jwtPassword); 
    if(!verify){
        res.status(403).json({
            msg:"Invalid token"
        })
    } 
    else {
        const courseId=req.params.courseId; 
        const username=req.headers.username;
        await User.updateOne({
              username:username
        }, 
        {
              "$push":{
                purchasedCourses: courseId
              }
        }) 

        res.json({
            msg:"Course purchased successfully"
        })
    }

   

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic 

    const token=req.headers.authorization; 
    const verify=jwt.verify(token,jwtPassword); 

    if(!verify){
        res.status(403).json({
            msg:"Invalid token"
        })
    } 
    else {
        const username=req.headers.username; 

        const user=await User.findOne({
            username:username
        }) 

        const course=await Course.find({
            _id:{
                "$in": user.purchasedCourses
            }
        }) 
        res.json({
            courses:course
        })
    }
});

module.exports = router