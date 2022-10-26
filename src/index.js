// imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// function to makes the individual buttons that make up the board
function Square(props) {
    return (
        <button 
            className="square" 
            onClick = {() => props.onClick()}
        >
            {props.value}
        </button>
    );
}
// class for the board, handles drawing the squares of the board and 
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                value = {this.props.squares[i]}
                onClick = {() => this.props.onClick(i)}
            />
        );
    }
    // draws the board
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(28)}
                    {this.renderSquare(29)}
                    {this.renderSquare(30)}
                    {this.renderSquare(31)}
                    {this.renderSquare(32)}
                    {this.renderSquare(33)}
                    {this.renderSquare(34)}
                </div>
                <div className="board-row">
                    {this.renderSquare(21)}
                    {this.renderSquare(22)}
                    {this.renderSquare(23)}
                    {this.renderSquare(24)}
                    {this.renderSquare(25)}
                    {this.renderSquare(26)}
                    {this.renderSquare(27)}
                </div>
                <div className="board-row">
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}
                    {this.renderSquare(16)}
                    {this.renderSquare(17)}
                    {this.renderSquare(18)}
                    {this.renderSquare(19)}
                    {this.renderSquare(20)}
                </div>
                <div className="board-row">
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                </div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                </div>
            </div>
        );
    }
}
  
// game class that handles what happens when you click on a square, creating the array for the undo buttons, ect.
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(34).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    // what happens when you click a square
    handleClick(i) {
        const history = this.state.history.slice(0,
    this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        // wont let you click on a square after game ends or if it is already clicked
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        // wont let you click on a square if the one below it is not filled
        if (squares[i-7] === null) {
            return;
        }
        // figures out who's turn is next
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    // handles jumping around to diffrent turns of the game
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    // creates the jump buttons
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key = {move}>
                    <button onClick = {() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        // shows who's turn it is or if someone won
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
                        squares = {current.squares}
                        onClick = {(i) => this.handleClick(i)}
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
  
// ========================================
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

// how to tell if someone one
function calculateWinner(squares) {
    const lines = [
        // top row
        [0, 1, 2, 3],
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6],
        // 2 row
        [7, 8, 9, 10],
        [8, 9, 10, 11],
        [9, 10, 11, 12],
        [10, 11, 12, 13],
        // mid row
        [14, 15, 16, 17],
        [15, 16, 17, 18],
        [16, 17, 18, 19],
        [17, 18, 19, 20],
        // 4 row
        [21, 22, 23, 24],
        [22, 23, 24, 25],
        [23, 24, 25, 26],
        [24, 25, 26, 27],
        // bottom row
        [28, 29, 30, 31],
        [29, 30, 31, 32],
        [30, 31, 32, 33],
        [31, 32, 33, 34],
        // left collum
        [0, 7, 14, 21],
        [7, 14, 21, 28],
        // 2 collum
        [1, 8, 15, 22],
        [8, 15, 22, 29],
        // 3 collum
        [2, 9, 16, 23],
        [9, 16, 23, 30],
        // mid collum
        [3, 10, 17, 24],
        [10, 17, 24, 31],
        // 5 collum
        [4, 11, 18, 25],
        [11, 18, 25, 32],
        // 6 collum
        [5, 12, 19, 26],
        [12, 19, 26, 33],
        // right collum
        [6, 13, 20, 27],
        [13, 20, 27, 34],
        // backslash top
        [0, 8, 16, 24],
        [1, 9, 17, 25],
        [2, 10, 18, 26],
        [3, 11, 19, 27],
        // backslash bottom
        [7, 15, 23, 31],
        [8, 16, 24, 32],
        [9, 17, 25, 33],
        [10, 18, 26, 34],
        // frontslash top
        [6, 12, 18, 24],
        [5, 11, 17, 23],
        [4, 10, 16, 22],
        [3, 9, 15, 21],
        // frontslash bottom
        [13, 19, 25, 31],
        [12, 18, 24, 30],
        [11, 17, 23, 29],
        [10, 16, 22, 28],

    ];
    // loop checking for win
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
            return squares[a];
        }
    }
    return null;
  }



  