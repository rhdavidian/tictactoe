function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++)
        board[i].push('');
    }

    const getBoard = () => board;
    const renderBoard = () => 
           console.table(board);
    
           //wiring up the array values to the html grid
    const wiring = () => {
        const rowsInOrder = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rowsInOrder.push(board[i][j]);
            }
        }
        console.log(rowsInOrder);
        const cell = document.getElementById('c0');
        const cell2 = document.getElementById('c1');
        const cell3 = document.getElementById('c2');
        const cell4 = document.getElementById('c3');
        const cell5 = document.getElementById('c4');
        const cell6 = document.getElementById('c5');
        const cell7 = document.getElementById('c6');
        const cell8 = document.getElementById('c7');
        const cell9 = document.getElementById('c8');
        cell.innerHTML = rowsInOrder[0];
        cell2.innerHTML = rowsInOrder[1];
        cell3.innerHTML = rowsInOrder[2];
        cell4.innerHTML = rowsInOrder[3];
        cell5.innerHTML = rowsInOrder[4];
        cell6.innerHTML = rowsInOrder[5];
        cell7.innerHTML = rowsInOrder[6];
        cell8.innerHTML = rowsInOrder[7];
        cell9.innerHTML = rowsInOrder[8];
    }

    const resetBoard = () => {
        for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++)
        board[i].push('');
        }
        renderBoard();
        game.whoseTurn();
    };

    const markCell = (row, column, token) =>  {
        const player = game.getActivePlayer().name;
        token = game.getActivePlayer().token;

        if (board[row][column] === '') {
            board[row][column] = token;
            console.log(`That was ${player}\'s turn. Very good.`)
            wiring();
            renderBoard();
            setTimeout(function() {game.announceWinner()}, 100);
            game.switchPlayer();
        } else if (board[row][column] === 'X' || board[row][column] === 'O'){
            alert('That spot is taken, choose another');
        };
    };

    return { getBoard, markCell, renderBoard, resetBoard, wiring };
};

//This was borrowed code from the connect four example...perhaps I'll need it later
// function Cell() {
//     let value = '';
//     return { value };
// }

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

    return { getActivePlayer, switchPlayer, whoseTurn, announceWinner, players }

    
}

//experimenting with getting everything to update to html
function Wiring2 () {
     const rowsInOrder = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    rowsInOrder.push(board[j][i]);
                }
            }

    return {}
}

const board = Gameboard();
const game = Gamecontroller();

