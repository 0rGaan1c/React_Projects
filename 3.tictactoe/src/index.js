// Made with the help of this tutorial
// https://medium.com/@shifrb/how-to-build-tic-tac-toe-with-react-hooks-ca37f6040022

import { render } from "@testing-library/react";
import React, { useState } from "react";
import reactDom from "react-dom";
import ReactDOM from "react-dom";
import "./index.css";

// the props are destructured in the function signature
function Square({value, onClick}) {


  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Restart({onClick}) {

  return (
    <button className="restart" onClick={onClick}>Play again!</button>
  );
}

// I need to create a copy of array or object before updating 
// them using the setState function of useState hook.
function Game() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);

  const winner = calculateWinner(squares);

  function renderSquare(i) {
    return <Square 
    value={squares[i]} 
    onClick={() => {
      if (squares[i] !== null || winner !== null) {
        return;
      }

      // a new duplicate array of the main squares array
      const nextSquares = squares.slice();
      // updating the nextSquares array not the original
      isNext ? nextSquares[i] = 'X' : nextSquares[i] = '0';
      // and then using the setSquares function and passing nextSquares as a parameter
      // and now squares array will become just like the nextSquares array
      setSquares(nextSquares);

      // same thing here
      // although I can just change the value of isNext directly.\
      const prevIsNext = !isNext;
      setIsNext(prevIsNext);
    }} />
  }

  function renderRestartButton() {
    return <Restart onClick={() => {
      setSquares(Array(9).fill(null));
      setIsNext(true);
     }} 
    />
  }

  function getStatus() {
    if (winner) {
      return "Winner: " + winner; 
    } else if (isBoardFull(squares)) {
      return "Draw!";
    } else {
      return "Next Player: " + (isNext ? "X" : "0");
    }
  }
  
  return (
    <div className="container">
      <div className="game">
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">{getStatus()}</div>
      <div className="restart-button">{renderRestartButton()}</div>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // go over all possibly winning lines and check if they consist of only X's/only O's
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
}


reactDom.render(<Game />, document.querySelector("#root"));