function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++)
        board[i].push(Cell());
    }

    const getBoard = () => board;

    //function to mark a cell with an X or O as a token
    const markCell = (row, column, token) =>  {
        if (board[row][column].value === '') {
            board[row][column].value = token;
        } else {
            alert('That spot is taken');
        }
    };
    
    return { getBoard, markCell };
};

//use this function to return functions addToken (X or O)
//as well as getValue. Value is 0 just for now
function Cell() {
    let value = '';
    return { value };
}

const array = Gameboard();