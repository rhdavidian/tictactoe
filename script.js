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
            renderBoard();
            game.announceWinner();
            game.switchPlayer();
        } else if (board[row][column] === 'X' || board[row][column] === 'O'){
            alert('That spot is taken, choose another');
        };
    };
    return { getBoard, markCell, renderBoard };
};

function Cell() {
    let value = '-';
    return { value };
}

function Gamecontroller (playerOneName = 'Player One', playerTwoName = 'Player Two') {

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
        } else if (diagonalOne.join('') === 'OOO' || diagonalTwo.join('') === 'OOO'){
            alert(`${players[1].name} Wins!`)
        }

        //check rows
        row.forEach((element) => {
            console.log(element.join(''));
            if (element.join('') === 'XXX') {
                alert(`${players[0].name} Wins!`)
            } else if (element.join('') === 'OOO') {
                alert(`${players[1].name} Wins!`)
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
            const columnTwo = columnsInOrder.slice(3,7).join('');
            const columnThree = columnsInOrder.slice(7).join('');

            if (columnOne === 'XXX' || columnTwo === 'XXX' || columnThree === 'XXX'){
                alert(`${players[0].name} Wins!`)
            } else if (columnOne === 'OOO' || columnTwo === 'OOO' || columnThree === 'OOO'){
                alert(`${players[1].name} Wins!`)
            }

            //WORKING CODE FOR NEXT 20 LINES, COMMENTED FOR EXPERIMENTING

              // const colArray1 = [];
            // const colArray2 = [];
            // const colArray3 = [];
            // for (let i = 0; i < 3; i++){
            //     colArray1.push(row[i][0]);
            //     var column1 = colArray1.join('');
            // };     
            // for (let i = 0; i < 3; i++){
            //     colArray2.push(row[i][1]);
            //     var column2 = colArray2.join('');
            // };
            // for (let i = 0; i < 3; i++){
            //     colArray3.push(row[i][2]);
            //     var column3 = colArray3.join('');
            // };

        // if (column1 === 'XXX' || column2 === 'XXX' || column3 === 'XXX'){
        //     alert(`${players[0].name} Wins!`)
        // } else if (column1 === 'OOO' || column2 === 'OOO' || column3 === 'OOO'){
        //     alert(`${players[1].name} Wins!`)
        // }
    };

    return { getActivePlayer, switchPlayer, whoseTurn, announceWinner }

    //include way to name players
}

const board = Gameboard();
const game = Gamecontroller();

