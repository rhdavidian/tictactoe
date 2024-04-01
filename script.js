function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++)
        board[i].push(Cell().value);
    }

    const getBoard = () => board;

    const renderBoard = () => 
           console.table(board);

    //function to mark a cell with an X or O as a token
    const markCell = (row, column, token) =>  {
        // token = game.getActivePlayer().name;
        // console.log(`That was ${token}\'s turn.`)
        token = game.getActivePlayer().token;
        if (board[row][column] === '-') {
            board[row][column] = token;
            game.switchPlayer();
        } else if (board[row][column] === 'X' || board[row][column].value === 'O'){
            alert('That spot is taken, choose another');
        };
        console.log(renderBoard());
    };
    return { getBoard, markCell, renderBoard };
};

function Cell() {
    let value = '-';
    return { value };
}

// function Cell() {
//     let value = '';
//     const addToken = (token) => {
//         value = token;
//     }
//     const getValue = () => value;

//     return { getValue, addToken };
// }

function Gamecontroller (
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {

    const players = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ]

    let activePlayer = players[0];
    const switchPlayer = () => {
       activePlayer = activePlayer === players[0] ? players[1] : players[0]; 
    }
    const getActivePlayer = () => activePlayer;
    const whoseTurn = () => console.log(`It is ${activePlayer.name}\'s turn.`);

    return { getActivePlayer, switchPlayer, whoseTurn }

    //include functions to switch players
    //include way to name players
}

const board = Gameboard();
const game = Gamecontroller();

