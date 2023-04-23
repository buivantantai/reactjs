import React, { useState, useEffect } from 'react'
import { Container, Button, Row } from 'react-bootstrap'

const Main2 = () => {
    const [countGuess, setCountGuess] = useState(0);
    const [randomNumber, setRandomNumber] = useState(10);
    const [inputValue, setInputValue] = useState('');
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    const newGame = () => {
        setCountGuess(0);
    }
    const guess = () => {
        setCountGuess(countGuess + 1);
    }
    useEffect(() => {
        const random = getRandomNumber(1,100);
        setRandomNumber(random);
    }, []);
      return (
        <div>
            <Container>
                <Row>
                    <div className='fs-1 fw-bold text-center m-5'>
                        Random number (1-100)
                    </div>
                </Row>
    
                <Row>
                    <Button onClick={newGame} variant='primary'>New Game</Button>
                </Row>
                <Row>
                    <p className='my-2'>Số lần đoán của bạn là: {countGuess}</p>
                    <p>{randomNumber}</p>
                    <p>Giá trị cảu ô input là: {inputValue}</p> 
                </Row>
                <Row>
                    <div className='input-group mb-3'>
                        <input type="text" className='form-control' placeholder="Input number" aria-label="Recipient's username" aria-describedby="button-addon2" value={inputValue} onChange={(item)=>{}}></input>
                        <button onClick={guess} className="btn btn-outline-secondary" type="button" id="button-addon2">Guess</button>
                    </div>
                </Row>
            </Container>
        </div>
        );
};

export default Main2;