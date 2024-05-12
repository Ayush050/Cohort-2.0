// here we write the types that we want to use so that we can verify using zod

const zod=require("zod");

const createTodo=zod.object({
    title:zod.string(),
    description:zod.string()
   
})  

const updateTodo=zod.object({
    id:zod.string()
   
})  

module.exports={
    createTodo,
    updateTodo
};

