import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";


function App() {

  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")

  useEffect(()=>{
   getAllToDo(setToDo)
  },[])


  const updateMode = (_id, text) =>{
   setIsUpdating(true);
   setText(text)
   setToDoId(_id)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (isUpdating) {
        updateToDo(toDoId, text, setText, setToDo, setIsUpdating);
      } else {
        addToDo(text, setText, setToDo);
      }
    }
  };

  const taskCount = toDo.length;

  return (
    <div className="App">
   <div className="container">

<h1>ToDo App</h1>

<div className="top">
<input type="text" placeholder="Add ToDos..."
value = {text}
onChange={(e) =>setText(e.target.value)}
 onKeyPress={handleKeyPress}
/>


<div className="add" 
onClick={isUpdating ? 
  () => updateToDo(toDoId, text, setText, setToDo, setIsUpdating) 
: () => addToDo(text, setText, setToDo)}>
  {isUpdating ? "Update" : "Add New Task"}
  </div>

</div>

<p className="totaltask"> Tasks to be done: {taskCount}</p>

<div className="list">
  {toDo.map((item) => <ToDo key={item._id} text={item.text} 
  updateMode={() => updateMode(item._id, item.text)}
  deleteToDo = {() => deleteToDo(item._id, setToDo)}
  
  />)}
  
</div>

   </div>

    </div>
  );
}

export default App;
