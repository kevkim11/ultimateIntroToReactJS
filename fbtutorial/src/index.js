import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       value: null
//     };
// }
//
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
/*
* Replaced the whole Square class with the follow function at the bottom.
* We've removed the constructor, and in fact, React supports a simpler syntax called functional components
  for component types like Square that only consist of a render method.
  Rather than define a class extending React.Component, simply write a function that takes props and returns
  what should be rendered.
* */
function Square(props) {
  // Functional Component
  // functional component = Component w/ only a constructor and render.
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     squares: Array(9).fill(null), // initialize an array of size 9 filled with null
  //     xIsNext: true, // to take turns
  //   };
  // }

  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   // Exception - if game is won
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   // else
  //   squares[i] = this.state.xIsNext ? 'X' : 'O'; // depending on xIsNext, mark it 'X' or 'O'
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext, // reset the state of turn
  //   });
  // }

  renderSquare(i) {
    // pasing in a value prop
    // return <Square value={this.props.squares[i]} onClick={()=>this.props.handleClick(i)} />;
    return <Square value={this.props.squares[i]} onClick={()=>this.props.onClick(i)} />;
  }

  render() {
    // // const status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }

    return (
      <div>
        {/*<div className="status">{status}</div>*/}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    // const history = this.state.history;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    // const current = history[history.length - 1];
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    //Showing the moves
    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });


    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

/* Helper function */
function calculateWinner(squares) {
  /*
  * Function to see who won thte game.
  * */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
