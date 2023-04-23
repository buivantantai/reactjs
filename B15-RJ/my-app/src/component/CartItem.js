import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CartItem({dataItem}) {
  console.log(dataItem.name);
  return (
    <Card style={{width: '18rem'}}>
      <Card.Img variant='top' src={dataItem.img} />
      <Card.Body>
        <Card.Title>{dataItem.name}</Card.Title>
        <Card.Text>{dataItem.price}</Card.Text>
        <Button variant='primary'>Go detail</Button>
      </Card.Body>
    </Card>
  );
}

export default CartItem;
