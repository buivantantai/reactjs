import React from 'react'

export default function Footer({count,toggleClassAll,toggleClassAct,toggleClassCom,handleSelectedAll,handleSelectedAct,handleSelectedCom,delTodosCom}) {


  return (
    <div className='footer-todo'>
      <span>{count} items left</span>
      <ul className='ul-footer'>
        <li><a className={toggleClassAll} onClick={handleSelectedAll}>All</a></li>
        <li><a className={toggleClassAct} onClick={handleSelectedAct}>Active</a></li>
        <li><a className={toggleClassCom} onClick={handleSelectedCom}>Completed</a></li>
      </ul>
      <a className='clear-complete' onClick={delTodosCom}>Clear Completed</a>
    </div>
  )
}
