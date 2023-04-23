import React, {useState} from 'react';
import Footer from './Footer';
import Body from './Body';
import Button from 'react-bootstrap/Button';
import Menu from './Menu';
import Parent from './Parent';

const Main = () => {
    const [showFooter, setShowFooter] = useState(false); // ush
    const [students, setStudents] = useState([
        {name: 'Iphone', age: 21, email: 'abc@gmail.com'},
        {name: 'Android', age: 21, email: 'def@gmail.com'},
        {name: 'Macbook', age: 21, email: 'ghi@gmail.com'},
        {name: 'windowPhone', age: 21, email: 'xyz@gmail.com'},
      ]);
      
    const toggleFooter = () => {
        setShowFooter(!showFooter);
      };
  return (
    <div>
      <h1>Main</h1>
      < Menu/>
      < Parent/>
      <div className='d-flex justify-content-center align-items-center'>
        <div>item1</div>
        <div>item2</div>
        <div>item3</div>
      </div>
      {/* <p>
        <Button onClick={toggleFooter}>Toggle Footer</Button>
      </p>
      <Body dataFromMain = {students}/>
      {showFooter === true ? (
        <Footer />
      ) : null} */}
    </div>
  );
};

export default Main;