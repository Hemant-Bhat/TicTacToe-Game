const gameBoard = document.getElementById('board');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
let isResultDeclared = false;

function TicTacToe(){
	// Initialization of game board
	const EMPTY = 0;
	const X = 1, O = -1;
	const BOARD = new Array(new Array(3).fill(EMPTY), new Array(3).fill(EMPTY), new Array(3).fill(EMPTY));
	let player = X;
	let totalClick = 0;
	
	return {
		totalClick: totalClick,
		player: player,
		clearBoard: function(){
			for(var i = 0; i < 3; i++){
				for(var j = 0; j < 3; j++){
					BOARD[i][j] = EMPTY;
				}
			}
			
			this.player = X;
			this.totalClick = 0;
		}, 
		putMark: function(row, col){
			if((row < 0) || (row > 2) || (col < 0) || (col > 2)){
				throw Error("Invalid board position");
			}
			if(BOARD[row][col] != EMPTY){
				throw Error("Board position occupied");
			}
			
			BOARD[row][col] = this.player;
			this.player = -this.player;
			this.totalClick++;
		},
		isWin: function(mark){
			return ((BOARD[0][0] + BOARD[0][1] + BOARD[0][2] == mark * 3) // row 0
			|| (BOARD[1][0] + BOARD[1][1] + BOARD[1][2] == mark * 3) // row 1
			|| (BOARD[2][0] + BOARD[2][1] + BOARD[2][2] == mark * 3) // row 2
			|| (BOARD[0][0] + BOARD[1][0] + BOARD[2][0] == mark * 3) // column 0
			|| (BOARD[0][1] + BOARD[1][1] + BOARD[2][1] == mark * 3) // column 1
			|| (BOARD[0][2] + BOARD[1][2] + BOARD[2][2] == mark * 3) // column 2
			|| (BOARD[0][0] + BOARD[1][1] + BOARD[2][2] == mark * 3) // diagonal 0
			|| (BOARD[2][0] + BOARD[1][1] + BOARD[0][2] == mark * 3) // reverse diagonal 0
			)
		},
		winner: function(){
			if(this.isWin(X)){
				return(X); // Winner is X (1)
			} else if(this.isWin(O)){
				return(O); // Winner is O (-1)
			} else if (this.totalClick == 9){ 
				return(2); // Game is draw
			}else {
				return(0); // Game is running
			}
		}
	}

}


const ticTacToe = new TicTacToe(); // creating an instance of TicTacToe

function restartGame(){
	if(isResultDeclared || (!isResultDeclared && confirm("Are you sure you want to restart game?"))){
		ticTacToe.clearBoard(); // Clearing the Array of instance
		
		isResultDeclared = false;
		restart.disabled = true;
		result.textContent = '';
		var buttons = gameBoard.querySelectorAll('button');
		for(button of buttons){
			button.disabled = false;
			button.textContent = '';
			button.style.background = '';
		}
	}
}


gameBoard.addEventListener('click', function(e){
	if(!isResultDeclared && e.target && e.target.dataset.pos){
		var [ row, col ] = e.target.dataset.pos.split(',');
		var element = e.target;
		element.disabled = true;
		if(ticTacToe.player == 1){
			element.textContent = 'X';
			element.style.background = "#3ed1ff";
		} else {
			element.textContent = 'O';
			element.style.background = "#ff9400";
		}
		
		ticTacToe.putMark(parseInt(row), parseInt(col));
		
		switch(ticTacToe.winner()){
			case -1: {
				result.textContent = 'Player O is winner';
				result.style.color = 'green';
				isResultDeclared = true;
			}
				break;
			case 1: { 
				result.textContent = 'Player X is winner';
				result.style.color = 'green';
				isResultDeclared = true;
			}
				break;
			case 2: { 
				result.textContent = 'Game draw!';
				result.style.color = 'red';
				isResultDeclared = true;
			}
				break;
			default: {
				restart.disabled = false;
			}
		}
	}
})

restart.addEventListener('click', restartGame);
