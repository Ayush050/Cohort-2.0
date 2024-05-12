
const express=require('express');
const app=express(); 
const cors=require('cors');
app.use(express.json()); 
app.use(cors());

const { createTodo, updateTodo } = require('./types');
const {Todo}=require('./database');

    app.post('/todo', async (req,res)=>{
        const title=req.body.title;
        const description=req.body.description;
        const validationResult=createTodo.safeParse({
            title,
            description
        }) 

        if(!validationResult.success){
            res.status(400).json({
                msg:"type mismatched"
            })
        }  
                // inserting the todo in a database 
                const newTodo= Todo({
                    title,
                    description,
                    completed:false
                }); 

                await newTodo.save(); 

                res.json({
                    msg:"new todo is created"
                })
        
        }) 
  
        app.get('/todos' , async (req,res)=>{ 
             const todos=await Todo.find({}); 
             res.json({
                todos
             })

        }) 

        app.put('/completed', async (req,res)=>{
            const id=req.body.id;
            const parseId=updateTodo.safeParse({id});
            if(!parseId.success){
                res.status(400).json({
                    msg:"Entered a wrong type"
                })
            }  
            // udpdate the todo using id in database 
            
              await Todo.updateOne(
                { _id: id },
                { $set: { completed: true } }
                
            );

            res.json({
                msg:"Todo is completed"
            })
       
        }) 

app.listen(3000);