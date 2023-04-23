import React from 'react';

const Body = ({dataFromMain}) => {
  return (
    <div>
      <h1>Body</h1>
      <ul>
        {/* react render list thì luôn luôn phải add props key vào  */}
        {dataFromMain.map((item, index) => {
          return (
            <li className='students' key={index}>
              <span>
                {item.name} - {item.age} - {item.email}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Body;