const mongoose=require('mongoose'); 
mongoose.connect('mongodb+srv://ayushsinghs347:AAaa11@cluster0.gfkkrge.mongodb.net/todo-app');

const todoSchema =new mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
}) 

const Todo =mongoose.model('Todo ',todoSchema ); 

module.exports= {Todo} ;