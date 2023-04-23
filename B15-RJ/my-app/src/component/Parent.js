import React, {useState} from 'react';
import {Button, Row} from 'react-bootstrap';
import CartItem from './CartItem';

import Child from './Child';

const Parent = () => {
  const [number, setNumber] = useState(90);
  const [showLight, setShowLight] = useState(false); // ush
  const [products, setProducts] = useState([
    {name: 'Iphone', price: 20000, img: 'https://picsum.photos/200'},
    {name: 'Android', price: 10000, img: 'https://picsum.photos/200'},
    {name: 'Macbook', price: 50000, img: 'https://picsum.photos/200'},
    {name: 'windowPhone', price: 1000, img: 'https://picsum.photos/200'},
  ]);
  //   tất cả event nhận vào 1 function => chứ không phải chạy function
  const toggleChild = () => {
    setShowLight(!showLight);
  };

  const inCreeCount = (numberIncree) => {
    setNumber(number + numberIncree);
  };
  //   để đẩm bảo tất cả event luôn nhận vào function chú ý tham số truyền vào.
  //   - function ko có tham số thì truyền trực tiếp vào event
  //   - function có tham số thì bọc trong 1 function khác

  return (
    <div>
      <h2 className='parent-click'>Parent</h2>
      <p>
        <Button onClick={toggleChild} variant='success'>
          toggle Child
        </Button>{' '}
        <Button
          onClick={() => {
            inCreeCount(10);
          }}
          variant='primary'
        >
          incree Count
        </Button>{' '}
      </p>

      <p>{number}</p>

      {showLight === true ? (
        <Child dataFromParent={number} name={'Tung'} />
      ) : null}

      <Row className='d-flex justify-content-around align-items-center'>
        {/* react render list thì luôn luôn phải add props key vào  */}
        {products.map((item, index) => {
          return <CartItem dataItem={item} />;
        })}
      </Row>
    </div>
  );
};

export default Parent;
