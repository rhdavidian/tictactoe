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
        const player = game.getActivePlayer().name;
        token = game.getActivePlayer().token;

        if (board[row][column] === '-') {
            board[row][column] = token;
            console.log(`That was ${player}\'s turn. Very good.`)
            game.announceWinner();
        } else if (board[row][column] === 'X' || board[row][column] === 'O'){
            alert('That spot is taken, choose another');
        };
        console.log(renderBoard());
        game.announceWinner();
    };
    return { getBoard, markCell, renderBoard };
};

function Cell() {
    let value = '-';
    return { value };
}


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

    const announceWinner = () => {
        const row = board.getBoard();
        
        //return elements in each column to check for 3 in a row, work in progress. try moving the loop
        row.map((value, index) => { 
            for (index = 0; i < 3; i++)
             console.log(value[index]);
        });

        // for (let i = 0; i < 3; i++){
            // row.forEach((element) => console.log(element.join('')))

            //announce winner if row wins
            row.forEach((element) =>  {
                if (element.join('') === 'XXX') {
                    alert('Player One Wins!')
                } else if (element.join('') === 'OOO') {
                    alert('Player Two Wins!')
                } else {
                    return;
                }
            });
            row.map((element) => console.log(element));
        // }
    }

    return { getActivePlayer, switchPlayer, whoseTurn, announceWinner }

    //include way to name players
}

const board = Gameboard();
const game = Gamecontroller();

