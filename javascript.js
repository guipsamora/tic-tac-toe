//http://www.cs.toronto.edu/~rdanek/csc148h_08/assignments/a3/A3.html

//Names of positions:
//Corner - 1,3,7,9
//Center - 5
//Middle - 2,4,6,8

// 1. Win:
// If you have two in a row, you can place a third to get three in a row.
// 2. Block:
// If the opponent has two in a row, you must play the third to block the opponent.
// 3. Fork:
// Create an opportunity where you have two threats to win (two non-blocked lines of 2).
// 4. Blocking an opponent's fork:
// If there is a configuration where the opponent can fork, you must block that fork.
// 5. Center:
// You play the center if open.
// 6. Opposite corner:
// If the opponent is in the corner, you play the opposite corner.
// 7. Empty corner:
// You play in a corner square.
// 8. Empty side:
// You play in a middle square on any of the 4 sides.
$(document).ready(function() {

var game = 
 [[0,0,0]
 ,[0,0,0]
 ,[0,0,0]];

var mapOfBoard = 
 [[1,2,3]
 ,[4,5,6]
 ,[7,8,9]];

var mapOfBoardReverse = ["zero",[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];

function theGameOrder(){
	testIfWin();
	var total = 0;

	//This flattens the game-array into one array with all the current numbers.
	var flattened = game.reduce(function(a, b) {
		return a.concat(b);
	}, []);

	
	//This sums the numbers in the tflattened array
	$.each(flattened,function() {
	    total += this;
	});

	//If the total sum of the numbers in the game is a odd number it is the humans turn. 
	//Otherwise it is the computers turn

	if(total % 2 === 1){
		console.log("It is humans turn");
		
		//This takes out the html-ID of the target that is being clicked. 
		$(".square").click(function(){    
	    var id = event.target.id;

	    //Since the IDs are follow this convention (square1, square2 etc) we need to take out the number. 
	    //We do this by slicing the string, and the taking out the last character (which is the number in the ID).
	    var boardPos = id.slice(-1);
	    
	    //Here we look into the map-array creating in the beginning of this file, 
	    //and takes out the element which is equal to the boardposition.
	    var here = mapOfBoardReverse[boardPos];
	    
	    //The human number is -1 and it is assigned at the correct position in the game.
	    game[here[0]][here[1]] = -1;
	    
	    //This changes the css of the O, and makes it visible on the game.
	    $("." + id + "-mark-O").css("display", "inline-block");
	    
	    //Here we restart this function, to be able to give the computer its turn
	    theGameOrder();	
		});
	}
	else {
		//SO if the total sum is even that mean that it is the computers turn. 
		//This calls the function computerMakesMove and then restart the function.
	 	computerMakeMove();
	 	theGameOrder();
	}

}



function computerMakeMove(){

	//This creates two random numbers.
	var randomMove1 = Math.floor(Math.random() * 3);
	var randomMove2 = Math.floor(Math.random() * 3);
	
	//If the position on the game-board is equal to zero, it means that neigher human nor computer
	//has used the square, and is therefor open to use.
	if (game[randomMove1][randomMove2] === 0){
		game[randomMove1][randomMove2] = 1;
		
		//It assings squareNr the square-number of the random move. It does this by chechking the map, that is found in the beginning of the program.
		var squareNr = mapOfBoard[randomMove1][randomMove2];
		
		//It changes the CSS of the specified square that was randomly chosen.
		$(".square" + squareNr + "-mark-X").css("display", "inline-block");
		return game;
	}
	else {
		computerMakeMove();
	}
}


	// Test To see if someone has won

function testIfWin(){

	//The winning posibilites
	var row1 = game[0][0] + game[0][1] + game[0][2];
 	var row2 = game[1][0] + game[1][1] + game[1][2];
 	var row3 = game[2][0] + game[2][1] + game[2][2];
 	var column1 = game[0][0] + game[1][0] + game[2][0];
 	var column2 = game[0][1] + game[1][1] + game[2][1];
 	var column3 = game[0][2] + game[1][2] + game[2][2];
 	var diag1 = game[0][2] + game[1][1] + game[2][0];
 	var diag2 = game[0][0] + game[1][1] + game[2][2];

 	if (row1 === -3 || row2 === -3 || row3 === -3 || column1 === -3 || column2 === -3 || column3 === -3 || diag1 === -3 || diag2 === -3 ){
 		$(".winner").text("Wow human just won");
 		//Todo: add reset-function here
 	}
 	else if (row1 === 3 || row2 === 3 || row3 === 3 || column1 === 3 || column2 === 3 || column3 === 3 || diag1 === 3 || diag2 === 3 ){
		$(".winner").text("Wow the computer just won");	
	}
}
//Rule 1 - make winning move if possibles
function makeWinningMove(){
	//The winning posibilites
	var row1 = game[0][0] + game[0][1] + game[0][2];
 	var row2 = game[1][0] + game[1][1] + game[1][2];
 	var row3 = game[2][0] + game[2][1] + game[2][2];
 	var column1 = game[0][0] + game[1][0] + game[2][0];
 	var column2 = game[0][1] + game[1][1] + game[2][1];
 	var column3 = game[0][2] + game[1][2] + game[2][2];
 	var diag1 = game[0][2] + game[1][1] + game[2][0];
 	var diag2 = game[0][0] + game[1][1] + game[2][2];

	if (row1 === 2){

	}
}

theGameOrder();

});


// function firstMove(){
// 	var startOrNot = startGame();
// 	//console.log(startOrNot);
// 	testIfWin();
// 	if (startOrNot === true){
// 	//console.log("This is the first computer-move");
// 	computerMakeMove();
// 	}
// 	else {
// 	console.log("Well the board is not clean");	
	
// }
// }


// function startGame(){
// var startOnZero = 0;
// 	for (var i = 0; i < game.length; i++) {

// 			for (var j = 0; j < game[i].length; j++) {
						
// 						startOnZero = startOnZero + game[i][j];
// 					};		
// 	};

// if (startOnZero === 0){
// 	console.log("board is clean");
// 	return true;
// }
// else {
// 	console.log("board is not clean");
// 	return false;
// }

// }








	//Might be useful
 	// var human = 0;
 	// var computer = 0;

 	// if (human === 0){
  //   	$("input").click(function(){
  //   		$(this).val("X");
	 //   });

 	// } else {

 	// 	$("input").cl(function(){
  //   		$(this).val("O");
	 //   });
  //   	human = -1;

 	// }

//

 


// //Rule fuctions
// // on first move - computer
// function ruleNumber1(){
// 	if (computer is player X){
// 		place X on 5 OR on 1,3,7,9
// 		game.replace(5 with X);
// 	}
// }

// //on second move - computer
// function humanPlacesCenter(){
// 	condition: if computer has put X in a corner. and human has 
// 	put O in center, put X in opposite corner of the first X
// }

// function humanPlacesMiddle(){
// 	Condition: Computer has played corner, 
// 	and human has played middle.
// 	Play center
// }

// function humanPlacesCorner(){
// 	Condition: Computer has played corner
// 	Human has played corner
// 	Computer plays center
// }

// //on second move - computer

// function humanPlacesMiddle(){
// 	Condition: Computer has played center, 
// 	and human has played middle.
// 	computer plays Corner that is empty
// }

// function humanPlacesCorner(){
// 	Condition: Computer has played center
// 	Human has played corner
// 	computer plays Corner that is empty / opposite
// }

// // check if there is a winner other wise game go on
// function testIfWinner(){
// 	if(three-in-a-row/column/cross){
// 		return "winner";
// 	}
// 	else {
// 		return "still no winner";
// 	}
// }
// // game go on

// // this rule is more important than blockHuman function
// function ruleAlwaysThreeInRow(){
// 	if (two X in a row always put the third X)
// 	if you have 2 marks in one row or column or diagnol then you put the third
// }

// function blockHuman(){
// 	Condition: when human has two in a row: always block.
// }

// // two rows and blocked
// function touchMost(){
// 	Condition: human blocked the computer, thus you cant invoke ruleAlwaysThreeInRow
// 	Computer been blocked after having two in a row diagonally.
// 	place X in position where it touches most Xs OR empty.

// 	place a condition to define touch

// 	if (opponent symbol is in the same row or column or diaginolly === 0)
// 	if (opponent symbolis is not in the row === 1)

// }




// check diagnol / row / column  if it touches 

// function buildTwoInRow(){
// 	check the best position, is the row already taken or not (empty)
// 	if so, doesn't play it there, if not place it there

// }

// function alwaysBlockTwo(){
// 	if(player O has two in a row always block with X)
// }


// //Move-functions

// function firstMove(){

// 	var number = ruleNumber1()
// 	replace number with X
// 	testIfWinner();

// }

// identify which place is empty, if in the array there is a number then is empty 
// if the element in array is an X or O the element should be blocked

// function secondMove(){
// 	var secondMoveNumber = $("#").val()
// 	replace secondMoveNumber with O
// }



// if certain condition then you call a certain function





