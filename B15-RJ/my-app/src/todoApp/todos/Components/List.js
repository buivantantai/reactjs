import React,{useState} from 'react'
import Footer from './Footer.js'


export default function List({dataFromIndex,count,editTodo,delTodos,toggleClassAll,toggleClassAct,toggleClassCom,handleSelectedAll,handleSelectedAct,handleSelectedCom,handleCheck,delTodosCom}) {
  const [isEdit, setIsEdit] = useState(null);
  const [name, setName] = useState("");
  return (
    
    <div className='list'> 
      <ul >
        {dataFromIndex.map((item,index) => {
          return (
            <li key={index} className="todo-list" onDoubleClick={()=>{setIsEdit(item.id)
                                                                      setName(item.name)}}> 
            {isEdit && isEdit === item.id ? (
                  <div>
                  <input className="form-check-input" type="checkbox" id="checkboxNoLabel" aria-label="..."
                    checked={item.ischeck}
                    onChange={(event) => {
                    let checked = event.target.checked;
                    handleCheck(checked,item.id);
                  }}></input>
                  <input onChange={(text) => {setName(text.target.value)}} value={name} type="text" className='edit-input'
                  onBlur={() => {setIsEdit(null)}}
                  onKeyUp={(e) =>{
                    if(e.key == 'Enter')
                    {
                      editTodo(item);
                      setIsEdit(null);
                    }
                  }}></input>
                  <span onClick={()=>delTodos(item.id)}>X</span>
                </div>
                ) : 
                (<div>
                  <input className="form-check-input" type="checkbox" id="checkboxNoLabel" aria-label="..."
                    checked={item.ischeck}
                    onChange={(event) => {
                    let checked = event.target.checked;
                    handleCheck(checked,item.id);
                  }}></input>
                  <p>{item.name}</p>
                  <span onClick={()=>delTodos(item.id)}>X</span>
                </div>)}
              
            </li>
          )
        })}
      </ul>  
        <Footer count={count} 
        toggleClassAll={toggleClassAll} 
        toggleClassAct={toggleClassAct} 
        toggleClassCom={toggleClassCom} 
        handleSelectedAll={handleSelectedAll}
        handleSelectedAct={handleSelectedAct}
        handleSelectedCom={handleSelectedCom}
        delTodosCom={delTodosCom}></Footer>
    </div>
  )
}
