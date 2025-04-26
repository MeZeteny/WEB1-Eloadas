const { useState } = React;


const Counter = () => {

  const [count, setCount] = useState(0);


  return React.createElement('div', null,

    React.createElement('h1', null, 'Számláló'),

    React.createElement('p', null, `Jelenlegi szám: ${count}`),

    React.createElement('button', { onClick: () => setCount(count + 1) }, 'Növelés'),

    React.createElement('button', { onClick: () => setCount(count - 1) }, 'Csökkentés'),

    React.createElement('button', { onClick: () => setCount(0) }, 'Reset')

  );

};


const TicTacToe = () => {

  const [board, setBoard] = useState(Array(9).fill(null));

  const [isXNext, setIsXNext] = useState(true);


  const handleClick = (index) => {

    if (board[index] || calculateWinner(board)) return;


    const newBoard = board.slice();

    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);

    setIsXNext(!isXNext);

  };


  const renderSquare = (index) => (

    React.createElement('button', { className: 'square', onClick: () => handleClick(index) }, board[index])

  );


  const winner = calculateWinner(board);

  let status;

  if (winner) {

    status = 'Nyertes: ' + winner;

  } else {

    status = 'Következő játékos: ' + (isXNext ? 'X' : 'O');

  }


  return React.createElement('div', null,

    React.createElement('h1', null, 'Tic-Tac-Toe'),

    React.createElement('div', { className: 'status' }, status),

    React.createElement('div', { className: 'board-row' },

      renderSquare(0),

      renderSquare(1),

      renderSquare(2)

    ),

    React.createElement('div', { className: 'board-row' },

      renderSquare(3),

      renderSquare(4),

      renderSquare(5)

    ),

    React.createElement('div', { className: 'board-row' },

      renderSquare(6),

      renderSquare(7),

      renderSquare(8)

    )

  );

};


function calculateWinner(squares) {

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


const App = () => {

  const [currentPage, setCurrentPage] = useState('counter');


  const renderPage = () => {

    switch (currentPage) {

      case 'counter':

        return React.createElement(Counter);

      case 'tictactoe':

        return React.createElement(TicTacToe);

      default:

        return React.createElement(Counter);

    }

  };


  return React.createElement('div', null,

    React.createElement('nav', null,

      React.createElement('button', { onClick: () => setCurrentPage('counter') }, 'Számláló'),

      React.createElement('button', { onClick: () => setCurrentPage('tictactoe') }, 'Tic-Tac-Toe')

    ),

    renderPage()

  );

};


ReactDOM.render(React.createElement(App), document.getElementById('root'));