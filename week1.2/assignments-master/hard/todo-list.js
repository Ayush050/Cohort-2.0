/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
          constructor(){
            this.todolist=[];
          } 

          add(todo){
             this.todolist.push(todo);
          } 
          remove(indexOfTodo){ 
            if(indexOfTodo>=this.todolist.length){
              return null;
            }
                 let newlist=this.todolist.filter((todo,index)=>index!=indexOfTodo);
                 this.todolist=newlist;
          } 
          update(index,updatedTodo){
            if(index>=this.todolist.length){
              return null;
            }
            this.todolist[index]=updatedTodo;
          } 
          getAll(){
            return this.todolist;
          } 
          get(indexOfTodo){
            if(indexOfTodo>=this.todolist.length){
              return null;
            }
                  return this.todolist[indexOfTodo];
          } 
          clear(){
            this.todolist=[];
          }
} 

module.exports = Todo;
