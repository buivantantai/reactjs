import React,{useState} from 'react';


export default function Input({addTodos,handleCheckAll}) {
  const [name, setName] = useState("");
  return (
    <div className="input-group mb-3 input-todos">
      <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleCheckAll}></button>
      <input type="text" className="form-control" placeholder='What needs to be done?' aria-label="Text input with dropdown button" 
      onChange={(text) => {
        setName(text.target.value);
      }}
      value={name}
      onKeyUp={(e) =>{
        if(e.key == 'Enter')
        {
          addTodos(name);
          setName("");
        }
      }}></input>
    </div>
  )
}
