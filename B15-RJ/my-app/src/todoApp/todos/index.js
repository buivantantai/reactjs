import React,{useState, useEffect} from 'react'
import Input from './Components/Input.js'
import List from './Components/List.js';
import axios from "axios";
const URL ='https://641438151821112fbfd1f014.mockapi.io/students/v1/todos';

export default function Index() {
  const [todos, setTodos] = useState(null);
  const [valueCount, setValueCount] = useState("");
  const [selectedAll, setSelectedAll] = useState(true);
  const [selectedAct, setSelectedAct] = useState(false);
  const [selectedCom, setselectedCom] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);


  const getListTodo = async () => {
    const result = await axios.get(URL);
    setTodos(result.data);
    const resultCount = Object.keys(result.data).length;
    setValueCount(resultCount);
  }; 

  const getListTodoAct = async () => {
    const result = await axios.get(URL);
    setTodos(result.data.filter((todo) => (todo.ischeck===false)));
    const resultCount = Object.keys(result.data.filter((todo) => (todo.ischeck===false))).length;
    setValueCount(resultCount);
  }; 

  const getListTodoCom = async () => {
    const result = await axios.get(URL);
    setTodos(result.data.filter((todo) => (todo.ischeck===true)));
    const resultCount = Object.keys(result.data.filter((todo) => (todo.ischeck===true))).length;
    setValueCount(resultCount);
  }; 

  useEffect(() => {
    getListTodo();
  }, []);

  const handleCheck = async (checked, id) =>{
    await axios.put(`${URL}/${id}`, {
      ischeck: checked,
    });
    if(selectedAct){
      getListTodoAct();
    }
    else if(selectedCom){
      getListTodoCom();
    }
    else
    getListTodo();
  }

  const handleCheckAll = async () =>{
    setIsCheckAll(!isCheckAll);
    if(isCheckAll)
    {
      for(let todo of todos) {
        await axios.put(`${URL}/${todo.id}`, {
          ischeck: true,
        }); 
      }
    }
    else {
      for(let todo of todos) {
        await axios.put(`${URL}/${todo.id}`, {
          ischeck: false,
        }); 
    }}
    if(selectedAct){
      getListTodoAct();
    }
    else if(selectedCom){
      getListTodoCom();
    }
    else
    getListTodo();
  }
  
  const addTodos = async (todosName) => {
    await axios.post(URL, {
      name: todosName,
      ischeck: false,
    });
    getListTodo();
  };

  const delTodos = async (id) => {
    await axios.delete(`${URL}/${id}`);
    if(selectedAct){
      getListTodoAct();
    }
    else if(selectedCom){
      getListTodoCom();
    }
    else
    getListTodo();
  };
  const delTodosCom = async () => {
    for(let todo of todos) {
      if(todo.ischeck===true)
      await axios.delete(`${URL}/${todo.id}`);
  }
  getListTodo();
}
  const editTodo = async (todo) => {
    await axios.put(`${URL}/${todo.id}`, {
        name: todo.name,
      });
      if(selectedAct){
        getListTodoAct();
      }
      else if(selectedCom){
        getListTodoCom();
      }
      else
      getListTodo();
  };

  const handleSelectedAll = () =>{
    getListTodo();
    setSelectedAll(true);
    setSelectedAct(false);
    setselectedCom(false);
  }
  const handleSelectedAct = () =>{
    getListTodoAct();
    setSelectedAll(false);
    setSelectedAct(true);
    setselectedCom(false);
    }
  const handleSelectedCom = () =>{
    getListTodoCom();
    setSelectedAll(false);
    setSelectedAct(false);
    setselectedCom(true);
  }
  let toggleClassAll = selectedAll ? 'selected' : '';
  let toggleClassAct = selectedAct ? 'selected' : '';
  let toggleClassCom = selectedCom ? 'selected' : '';

  
  return (
    <div className='todoapp'>
      <h1 className='header_todos'>todos</h1>
      <Input addTodos={addTodos}
             handleCheckAll={handleCheckAll}/>
      {todos ? (<List dataFromIndex={todos}
                 count={valueCount}
                 delTodos={delTodos} 
                 editTodo={editTodo}
                 toggleClassAll={toggleClassAll} 
                 toggleClassAct={toggleClassAct} 
                 toggleClassCom={toggleClassCom}
                 handleSelectedAll={handleSelectedAll}
                 handleSelectedAct={handleSelectedAct}
                 handleSelectedCom={handleSelectedCom}
                 handleCheck={handleCheck}
                 delTodosCom={delTodosCom}/>) : (null)}
    </div>
  )
}
