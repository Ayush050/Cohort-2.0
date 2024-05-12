import { useState } from "react";

export function CreateTodo() {
  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState(""); 

  const handleAddTodo = async () => { 
    try {
      const response = await fetch('http://localhost:3000/todo', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      // Clear input fields after successful addition
      setTitle("");
      setDescription("");
      
      alert("Todo added");
    } catch (error) {
      alert("Failed to add todo");
    }
  };

  return (
    <div>
      <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/> <br/>
      <input type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)}/> <br/>
      <button onClick={handleAddTodo}>Add todo</button>
    </div>
  );
}
