function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++)
        board[i].push('-');
    }

    const getBoard = () => board;
    const renderBoard = () => 
           console.table(board);

    const resetBoard = () => {
        for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++)
        board[i].push('-');
        }
        renderBoard();
        game.whoseTurn();
    };

    const markCell = (row, column, token) =>  {
        const player = game.getActivePlayer().name;
        token = game.getActivePlayer().token;

        if (board[row][column] === '-') {
            board[row][column] = token;
            console.log(`That was ${player}\'s turn. Very good.`)
            renderBoard();
            game.announceWinner();
            game.switchPlayer();
        } else if (board[row][column] === 'X' || board[row][column] === 'O'){
            alert('That spot is taken, choose another');
        };
    };
    return { getBoard, markCell, renderBoard, resetBoard };
};

function Gamecontroller (playerOneName = 'Player One', playerTwoName = 'Player Two') {
    //include way for players to name themselves
    
    const players = [
        {
            name: playerOneName,
            token: 'X',
            score: 0
        },
        {
            name: playerTwoName,
            token: 'O',
            score: 0
        }
    ]
    const changeP1Name = () => players[0].name = prompt('Enter Player One Name:')
    const changeP2Name = () =>  players[1].name = prompt('Enter Player Two Name:')



    const showScores = () => {
        console.log(`${players[0].name}\'s Score: ${players[0].score}`)
        console.log(`${players[1].name}\'s Score: ${players[1].score}`)
    }
    let activePlayer = players[0];
    const switchPlayer = () => {
       activePlayer = activePlayer === players[0] ? players[1] : players[0]; 
       console.log(`It is now ${activePlayer.name}\'s turn.`)
    }
    const getActivePlayer = () => activePlayer;
    const whoseTurn = () => console.log(`It is ${activePlayer.name}\'s turn.`);

    const announceWinner = () => {
        const row = board.getBoard();
        //check diagonals
        const diagonalOne = [];
        const diagonalTwo = [];
        for (let i = 0; i < 3; i++){
            diagonalOne.push(row[i][i]);
            diagonalTwo.push(row[2-i][i]);
        }
        if (diagonalOne.join('') === 'XXX' || diagonalTwo.join('') === 'XXX') {
            alert(`${players[0].name} Wins!`)
            players[0].score++;
            board.resetBoard();
        } else if (diagonalOne.join('') === 'OOO' || diagonalTwo.join('') === 'OOO'){
            alert(`${players[1].name} Wins!`)
            players[1].score++;
            showScores();
            board.resetBoard();
            showScores();
        }
        //check rows
        row.forEach((element) => {
            if (element.join('') === 'XXX') {
                alert(`${players[0].name} Wins!`);
                players[0].score++;
                board.resetBoard();
                showScores();
            } else if (element.join('') === 'OOO') {
                alert(`${players[1].name} Wins!`);
                players[1].score++;
                board.resetBoard();
                showScores();
            }
        });
        // //check columns 
        const columnsInOrder = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    columnsInOrder.push(row[j][i]);
                }
            }
        const columnOne = columnsInOrder.slice(0,3).join('');
        const columnTwo = columnsInOrder.slice(3,6).join('');
        const columnThree = columnsInOrder.slice(6).join('');

        if (columnOne === 'XXX' || columnTwo === 'XXX' || columnThree === 'XXX'){
            alert(`${players[0].name} Wins!`);
            players[0].score++;
            board.resetBoard();
            showScores();
        } else if (columnOne === 'OOO' || columnTwo === 'OOO' || columnThree === 'OOO'){
            alert(`${players[1].name} Wins!`);
            players[1].score++;
            board.resetBoard();
            showScores();
        };
    };

    return { getActivePlayer, switchPlayer, whoseTurn, announceWinner, players, changeP1Name, changeP2Name }
}

const board = Gameboard();
const game = Gamecontroller();

