const tTT = (function() {
    var gameboard = {
        rows: 3,
        colums: 3,
        board: [],
        init: function() {
            this.markCell();
            this.makeBoard();
            this.getBoard();
            this.resetBoard();
            this.assignCells();
            gameController.announceWinner();
            gameController.setName();
            gameController.getActivePlayer();
            gameController.setScore();
            gameController.P1Name();
            gameController.P2Name();
        },
        makeBoard: function() {
            for (let i = 0; i < this.rows; i++){
                this.board[i] = [];
                for (let j = 0; j < this.columns; j++)
                this.board[i].push('');
            }
        },
        getBoard: function() { 
            return this.board
        },
        assignCells: function() {
            const rowsInOrder = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    rowsInOrder.push(this.board[i][j]);
                }
            }
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
        },
        resetBoard: function() {
            for (let i = 0; i < rows; i++){
                this.board[i] = [];
                for (let j = 0; j < columns; j++)
                this.board[i].push('');
                }
                this.assignCells();
                gameController.whoseTurn();
        },
        markCell: function(row, column, token) {
            token = gameController.getActivePlayer().token;

            if (this.board[row][column] === '') {
                this.board[row][column] = token;
                this.assignCells();
                setTimeout(function() {gameController.announceWinner()}, 100);
                gameController.switchPlayer();
                gameController.setName();
            } else if (this.board[row][column] === 'X' || this.board[row][column] === 'O'){
                alert('That spot is taken, choose another');
            };
        }    
    };

    var gameController = {
        players: [
            {
                name: 'Player One',
                token: 'X',
                score: 0
            },
            {
                name: 'Player Two',
                token: 'O',
                score: 0
            }
        ],
        activePlayer: this.players[0],
        setName: function() {
            const p1Name = document.getElementById('p1Name');
            const p2Name = document.getElementById('p2Name');
            p1Name.innerHTML = this.players[0].name;
            p2Name.innerHTML = this.players[1].name;
            if (activePlayer === this.players[0]){
                p1Name.classList.add('active');
                p2Name.classList.remove('active');
           } else {
                p1Name.classList.remove('active');
                p2Name.classList.add('active');
           };
        },
        changeP1Name: function() {
            this.players[0].name = prompt('Enter Player One Name:');
            this.setName();
        },
        changeP2Name: function() {
            this.players[1].name = prompt('Enter Player One Name:');
            this.setName();
        },
        setScore: function() {
            const p1Score = document.getElementById('p1Score');
            const p2Score = document.getElementById('p2Score');
            p1Score.innerHTML = 'Score: ' + this.players[0].score;
            p2Score.innerHTML = 'Score: ' + this.players[1].score;
        },
        switchPlayer: function() {
            this.activePlayer = activePlayer === this.players[0] ? this.players[1] : this.players[0]; 
            console.log(`It is now ${this.activePlayer.name}\'s turn.`);
        },
        getActivePlayer: function () {return this.activePlayer},
        announceWinner: function () {
            const row = gameboard.getBoard();
            //check diagonals
            const diagonalOne = [];
            const diagonalTwo = [];
            for (let i = 0; i < 3; i++){
                diagonalOne.push(row[i][i]);
                diagonalTwo.push(row[2-i][i]);
            }
            if (diagonalOne.join('') === 'XXX' || diagonalTwo.join('') === 'XXX') {
                alert(`${this.players[0].name} Wins! ${this.players[1].name} starts next.`)
                this.players[0].score++;
                gameboard.resetBoard();
            } else if (diagonalOne.join('') === 'OOO' || diagonalTwo.join('') === 'OOO'){
                alert(`${this.players[1].name} Wins! ${this.players[0].name} starts next.`)
                this.players[1].score++;
                gameboard.resetBoard();
            }
            //check rows
            row.forEach((element) => {
                if (element.join('') === 'XXX') {
                    alert(`${this.players[0].name} Wins! ${this.players[1].name} starts next.`);
                    this.players[0].score++;
                    gameboard.resetBoard();
                } else if (element.join('') === 'OOO') {
                    alert(`${this.players[1].name} Wins! ${this.players[0].name} starts next.`);
                    this.players[1].score++;
                    gameboard.resetBoard();
                }
            });
            //check columns 
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
                    alert(`${this.players[0].name} Wins! ${this.players[1].name} starts next.`);
                    this.players[0].score++;
                    gameboard.resetBoard();
                } else if (columnOne === 'OOO' || columnTwo === 'OOO' || columnThree === 'OOO'){
                    alert(`${this.players[1].name} Wins! ${this.players[0].name} starts next.`);
                    this.players[1].score++;
                    gameboard.resetBoard();
                };
            this.setScore();
        }
    };
    
    gameboard.init();

})();