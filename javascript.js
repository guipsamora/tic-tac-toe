
var score = {
	human: 0,
	computer: 0,
	draw: 0
}




$(document).ready(function() {

// current game representation
var game = 
 [[0,0,0]
 ,[0,0,0]
 ,[0,0,0]];

// board positions
var mapOfBoard = 
 [[1,2,3]
 ,[4,5,6]
 ,[7,8,9]];

var mapOfBoardReverse = ["zero",[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];

var computerTurn = 0;
var humanTurn = 0;
var turn = 0
var total = 0;

function theGameOrder(){
	console.log(turn)
	testIfWin();

	var row1 = game[0][0] + game[0][1] + game[0][2];
	var row2 = game[1][0] + game[1][1] + game[1][2];
	var row3 = game[2][0] + game[2][1] + game[2][2];
	var column1 = game[0][0] + game[1][0] + game[2][0];
	var column2 = game[0][1] + game[1][1] + game[2][1];
	var column3 = game[0][2] + game[1][2] + game[2][2];
	var diag1 = game[0][2] + game[1][1] + game[2][0];
	var diag2 = game[0][0] + game[1][1] + game[2][2];

	//This flattens the game-array into one array with all the current numbers.
	var flattened = game.reduce(function(a, b) {
		return a.concat(b);
	}, []);

	//This sums the numbers in the flattened array
	$.each(flattened, function() {
	    total += this;
	});
	// if the turn is odd is a human turn, if is even it is the computer turn
	if (turn === 0) {
		computerFirstMove();
		//Here we restart this function, to be able to give the computer its turn
	    theGameOrder();
	    console.log(game)
	    // console.log(humanturn);
	} else if(turn % 2 !== 0){
		console.log("It is humans turn");
		//This takes out the html-ID of the target that is being clicked. 
			$(".square").click(function(e){

			 console.log("Human clicked");
		    var id = event.target.id;
		    console.log(id);
		    //Since the IDs are follow this convention (square1, square2 etc) we need to take out the number. 
		    //We do this by slicing the string, and the taking out the last character (which is the number in the ID).
		    var boardPos = id.slice(-1);
		    
		    //Here we look into the map-array creating in the beginning of this file, 
		    //and takes out the element which is equal to the boardposition.
		    var here = mapOfBoardReverse[boardPos];
		    
		    //The human number is -1 and it is assigned at the correct position in the game.
		    game[here[0]][here[1]] = -10;

		    //This changes the css of the O, and makes it visible on the game.
		    $("." + id + "-mark-O").css("display", "inline-block");
		    turn++;
		    console.log(game);
		    e.stopImmediatePropagation()
		    theGameOrder();
			});
	} else {

		console.log("It is computer turn");
		//SO if the total sum is even that mean that it is the computers turn. 
		//This calls the function computerMakesMove
	 	computerMakeMove();
	 	console.log(game);
	 	//Here we restart this function, to be able to give the computer its turn
	 	theGameOrder();
	}
}

// computerFirstMove() in order to win or draw the game the computer must play any of the following positions
function computerFirstMove(){
	console.log("FirstMove called")
	var firstMoves = [[0,0],[0,2],[1,1],[2,0],[2,2]]
	var random = Math.floor(Math.random() * 5)
	var move1 = firstMoves[random][0];
	var move2 = firstMoves[random][1];
	if (game[move1][move2] === 0){
		game[move1][move2] = 10;

		//It assings squareNr the square-number of the random move. It does this by checking the map, that is found in the beginning of the program.
		var squareNr = mapOfBoard[move1][move2];

		//It changes the CSS of the specified square that was randomly chosen.
		$(".square" + squareNr + "-mark-X").css("display", "inline-block");
		turn++;
		return game;
	}
}

function computerMakeMove(){
	var row1 = game[0][0] + game[0][1] + game[0][2];
	var row2 = game[1][0] + game[1][1] + game[1][2];
	var row3 = game[2][0] + game[2][1] + game[2][2];
	var column1 = game[0][0] + game[1][0] + game[2][0];
	var column2 = game[0][1] + game[1][1] + game[2][1];
	var column3 = game[0][2] + game[1][2] + game[2][2];
	var diag1 = game[0][2] + game[1][1] + game[2][0];
	var diag2 = game[0][0] + game[1][1] + game[2][2];

	if (row1 === 20 || row2 === 20 || row3 === 20 || column1 === 20 || column2 === 20 || column3 === 20 || diag1 === 20 || diag2 === 20 ){
		goWinningMove();
		console.log("Go winning called")
		turn++;
		return; 
	}

	if (row1 === -20 || row2 === -20 || row3 === -20 || column1 === -20 || column2 === -20 || column3 === -20 || diag1 === -20 || diag2 === -20 ){
		blockWinningMove();
		console.log("BlockWinning called")
		turn++;
		return; 
 	}

	var bestMoves = [[0,0],[0,2],[1,1],[2,0],[2,2]]
	var moves = [game[0][0],game[0][2],game[1][1],game[2][0],game[2][2]];
	var random = Math.floor(Math.random() * 5)
	var move1 = bestMoves[random][0];
	var move2 = bestMoves[random][1];
	var total = moves.reduce(function(prev, curr){
		return prev + curr;
	});

	//This creates two random numbers.
	var randomMove1 = Math.floor(Math.random() * 3);
	var randomMove2 = Math.floor(Math.random() * 3);




	if (game[move1][move2] === 0){
		game[move1][move2] = 10;
		
		//It assings squareNr the square-number of the random move. It does this by checking the map, that is found in the beginning of the program.
		var squareNr = mapOfBoard[move1][move2];
		
		//It changes the CSS of the specified square that was randomly chosen.
		$(".square" + squareNr + "-mark-X").css("display", "inline-block");
		turn++;
		return game;
	}  //If the position on the game-board is equal to zero, it means that neither human nor computer
		//has used the square, and is therefore open for use.
	else if (game[randomMove1][randomMove2] === 0 && total === 10){
		game[randomMove1][randomMove2] = 10;
		
		//It assings squareNr the square-number of the random move. It does this by checking the map, that is found in the beginning of the program.
		var squareNr = mapOfBoard[randomMove1][randomMove2];
		
		//It changes the CSS of the specified square that was randomly chosen.
		$(".square" + squareNr + "-mark-X").css("display", "inline-block");
	 	console.log("Computer move worked")	
	 	turn++;
		return;
	} else {
		computerMakeMove();
	}
}

function blockWinningMove(){
	//The winning posibilites
	var row1Arr = [game[0][0], game[0][1], game[0][2]];
 	var row2Arr = [game[1][0], game[1][1], game[1][2]];
 	var row3Arr = [game[2][0], game[2][1], game[2][2]];
 	var column1Arr = [game[0][0], game[1][0], game[2][0]];
 	var column2Arr = [game[0][1], game[1][1], game[2][1]];
 	var column3Arr = [game[0][2], game[1][2], game[2][2]];
 	var diag1Arr = [game[0][2], game[1][1], game[2][0]];
 	var diag2Arr = [game[0][0], game[1][1], game[2][2]];

	var row1 = game[0][0] + game[0][1] + game[0][2];
	var row2 = game[1][0] + game[1][1] + game[1][2];
	var row3 = game[2][0] + game[2][1] + game[2][2];
	var column1 = game[0][0] + game[1][0] + game[2][0];
	var column2 = game[0][1] + game[1][1] + game[2][1];
	var column3 = game[0][2] + game[1][2] + game[2][2];
	var diag1 = game[0][2] + game[1][1] + game[2][0];
	var diag2 = game[0][0] + game[1][1] + game[2][2];
	
	console.log("I'm working")

	var i;

 	function checkempty(x){
 		for (i = 0; i < x.length; i++) {
 			if(x[i] === 0){
 				return i;
 			}
		};
 	}

	if(row1 === -20){
			checkempty(row1Arr)
			console.log(i)
			switch(i){
				case 0:
		        var squareNr = mapOfBoard[0][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");					
		        return game[0][0] = 10
		        break;
 			   case 1:
		        var squareNr = mapOfBoard[0][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		         			   
		        return game[0][1] = 10
		        break;
		      case 2:
		        var squareNr = mapOfBoard[0][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        		      
		        return game[0][2] = 10
		        break;  
			}
	} else if(row2 === -20){
			checkempty(row2Arr)
			console.log(i)
			switch(i){
				case 0:
		        var squareNr = mapOfBoard[1][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        					
		        return game[1][0] = 10
		        break;
 			   case 1:
		        var squareNr = mapOfBoard[1][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		         			   
		        return game[1][1] = 10
		        break;
		      case 2:
		        var squareNr = mapOfBoard[1][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        		      
		        return game[1][2] = 10
		        break;  
			}
	} else if(row3 === -20){
			checkempty(row3Arr)
			console.log(i)
			switch(i){
				case 0:
		        var squareNr = mapOfBoard[2][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        				
		        return game[2][0] = 10
		        break;
 			   case 1:
		        var squareNr = mapOfBoard[2][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		         			   
		        return game[2][1] = 10
		        break;
		      case 2:
		        var squareNr = mapOfBoard[2][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        		      
		        return game[2][2] = 10
		        break;  
			}
	} else if(column1 === -20){
		checkempty(column1Arr)
			console.log(i)
			switch(i){
				case 0:
		        var squareNr = mapOfBoard[0][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        				
		        return game[0][0] = 10
		        break;
 			   case 1:
		        var squareNr = mapOfBoard[1][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		         			   
		        return game[1][0] = 10
		        break;
		      case 2:
		        var squareNr = mapOfBoard[2][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        		      
		        return game[2][0] = 10
		        break;  
		      default:
			}
	} else if(column2 === -20){
		checkempty(column2Arr)
		console.log(i)
		switch(i){
			case 0:
		        var squareNr = mapOfBoard[0][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        			
	        return game[0][1] = 10
	        break;
			   case 1:
		        var squareNr = mapOfBoard[1][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        			   
	        return game[1][1] = 10
	        break;
	      case 2:
		        var squareNr = mapOfBoard[2][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        	      
	        return game[2][1] = 10
	        break;  
	      default:
		}
	} else if(column3 === -20){
		checkempty(column3Arr)
		console.log(i)
		switch(i){
			case 0:
		        var squareNr = mapOfBoard[0][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        			
	        return game[0][2] = 10
	        break;
			   case 1:
		        var squareNr = mapOfBoard[1][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        			   
	        return game[1][2] = 10
	        break;
	      case 2:
		        var squareNr = mapOfBoard[2][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        	      
	        return game[2][2] = 10
	        break;  
	      default:
		}
	} else if(diag1 === -20){
		checkempty(diag1Arr)
		console.log(i)
		switch(i){
			case 0:
		        var squareNr = mapOfBoard[0][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        			
	        return game[0][2] = 10
	        break;
			   case 1:
		        var squareNr = mapOfBoard[1][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        			   
	        return game[1][1] = 10
	        break;
	      case 2:
		        var squareNr = mapOfBoard[2][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        	      
	        return game[2][0] = 10
	        break;  
	      default:
		}
	} else if(diag2 === -20){
			checkempty(diag2Arr)
			console.log(i)
			switch(i){
				case 0:
		        var squareNr = mapOfBoard[0][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        				
		        return game[0][0] = 10
		        break;
 			   case 1:
		        var squareNr = mapOfBoard[1][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		         			   
		        return game[1][1] = 10
		        break;
		      case 2:
		        var squareNr = mapOfBoard[2][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        		      
		        return game[2][2] = 10
		        break;  
		      default:
			}
	}
};

function goWinningMove(){
	//The winning posibilites
	var row1Arr = [game[0][0], game[0][1], game[0][2]];
 	var row2Arr = [game[1][0], game[1][1], game[1][2]];
 	var row3Arr = [game[2][0], game[2][1], game[2][2]];
 	var column1Arr = [game[0][0], game[1][0], game[2][0]];
 	var column2Arr = [game[0][1], game[1][1], game[2][1]];
 	var column3Arr = [game[0][2], game[1][2], game[2][2]];
 	var diag1Arr = [game[0][2], game[1][1], game[2][0]];
 	var diag2Arr = [game[0][0], game[1][1], game[2][2]];

	var row1 = game[0][0] + game[0][1] + game[0][2];
	var row2 = game[1][0] + game[1][1] + game[1][2];
	var row3 = game[2][0] + game[2][1] + game[2][2];
	var column1 = game[0][0] + game[1][0] + game[2][0];
	var column2 = game[0][1] + game[1][1] + game[2][1];
	var column3 = game[0][2] + game[1][2] + game[2][2];
	var diag1 = game[0][2] + game[1][1] + game[2][0];
	var diag2 = game[0][0] + game[1][1] + game[2][2];
	
	console.log("I'm working")

	var i;

 	function checkempty(x){
 		for (i = 0; i < x.length; i++) {
 			if(x[i] === 0){
 				return i;
 			}
		};
 	}

	if(row1 === 20){
			checkempty(row1Arr)
			console.log(i)
			switch(i){
				case 0:
		        var squareNr = mapOfBoard[0][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");					
		        return game[0][0] = 10

		        break;
 			   case 1:
		        var squareNr = mapOfBoard[0][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		         			   
		        return game[0][1] = 10

		        break;
		      case 2:
		        var squareNr = mapOfBoard[0][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        		      
		        return game[0][2] = 10
		        break;  
			}
	} else if(row2 === 20){
			checkempty(row2Arr)
			console.log(i)
			switch(i){
				case 0:
		        var squareNr = mapOfBoard[1][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        					
		        return game[1][0] = 10
		        break;
 			   case 1:
		        var squareNr = mapOfBoard[1][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		         			   
		        return game[1][1] = 10
		        break;
		      case 2:
		        var squareNr = mapOfBoard[1][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        		      
		        return game[1][2] = 10
		        break;  
			}
	} else if(row3 === 20){
			checkempty(row3Arr)
			console.log(i)
			switch(i){
				case 0:
		        var squareNr = mapOfBoard[2][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        				
		        return game[2][0] = 10
		        break;
 			   case 1:
		        var squareNr = mapOfBoard[2][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		         			   
		        return game[2][1] = 10
		        break;
		      case 2:
		        var squareNr = mapOfBoard[2][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        		      
		        return game[2][2] = 10
		        break;  
			}
	} else if(column1 === 20){
		checkempty(column1Arr)
			console.log(i)
			switch(i){
				case 0:
		        var squareNr = mapOfBoard[0][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        				
		        return game[0][0] = 10
		        break;
 			   case 1:
		        var squareNr = mapOfBoard[1][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		         			   
		        return game[1][0] = 10
		        break;
		      case 2:
		        var squareNr = mapOfBoard[2][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        		      
		        return game[2][0] = 10
		        break;  
		      default:
			}
	} else if(column2 === 20){
		checkempty(column2Arr)
		console.log(i)
		switch(i){
			case 0:
		        var squareNr = mapOfBoard[0][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        			
	        return game[0][1] = 10
	        break;
			   case 1:
		        var squareNr = mapOfBoard[1][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        			   
	        return game[1][1] = 10
	        break;
	      case 2:
		        var squareNr = mapOfBoard[2][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        	      
	        return game[2][1] = 10
	        break;  
	      default:
		}
	} else if(column3 === 20){
		checkempty(column3Arr)
		console.log(i)
		switch(i){
			case 0:
		        var squareNr = mapOfBoard[0][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        			
	        return game[0][2] = 10
	        break;
			   case 1:
		        var squareNr = mapOfBoard[1][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        			   
	        return game[1][2] = 10
	        break;
	      case 2:
		        var squareNr = mapOfBoard[2][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        	      
	        return game[2][2] = 10
	        break;  
	      default:
		}
	} else if(diag1 === 20){
		checkempty(diag1Arr)
		console.log(i)
		switch(i){
			case 0:
		        var squareNr = mapOfBoard[0][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        			
	        return game[0][2] = 10
	        break;
			   case 1:
		        var squareNr = mapOfBoard[1][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        			   
	        return game[1][1] = 10
	        break;
	      case 2:
		        var squareNr = mapOfBoard[2][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        	      
	        return game[2][0] = 10
	        break;  
	      default:
		}
	} else if(diag2 === 20){
			checkempty(diag2Arr)
			console.log(i)
			switch(i){
				case 0:
		        var squareNr = mapOfBoard[0][0];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        				
		        return game[0][0] = 10
		        break;
 			   case 1:
		        var squareNr = mapOfBoard[1][1];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		         			   
		        return game[1][1] = 10
		        break;
		      case 2:
		        var squareNr = mapOfBoard[2][2];
				  //It changes the CSS of the specified square that was randomly chosen.
				  $(".square" + squareNr + "-mark-X").css("display", "inline-block");		        		      
		        return game[2][2] = 10
		        break;  
		      default:
			}
	}
};

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

 	if (row1 === -30 || row2 === -30 || row3 === -30 || column1 === -30 || column2 === -30 || column3 === -30 || diag1 === -30 || diag2 === -30 ){
 		
 		score.human++
 		game = [[0,0,0], [0,0,0], [0,0,0]];
 		turn = 0;
 		alert("Human won");
 		$("#human_score").text("Human won: " + score.human);
 		for (var i = 0; i < mapOfBoardReverse.length; i++) {
 			$(".square" + i + "-mark-X").css("display", "none");		        		      
 			$(".square" + i + "-mark-O").css("display", "none");		        		      
 		};
 		return;
 		//Todo: add reset-function here
 	} else if (row1 === 30 || row2 === 30 || row3 === 30 || column1 === 30 || column2 === 30 || column3 === 30 || diag1 === 30 || diag2 === 30 ){
		
		score.computer++
		game = [[0,0,0] ,[0,0,0], [0,0,0]];
		turn = 0;
		alert("Computer won");
  		for (var i = 0; i < mapOfBoardReverse.length; i++) {
 			$(".square" + i + "-mark-X").css("display", "none");		        		      
 			$(".square" + i + "-mark-O").css("display", "none");		        		      
 		};
		$("#computer_score").text("Computer won: " + score.computer);	
		return;
	} else if ( game[0][0] !== 0 && game[0][1] !== 0 && game[0][2] !== 0 && game[1][0] !== 0 && game[1][1] !== 0 && game[1][2] !== 0 && game[2][0] !== 0 && game[2][1] !== 0 && game[2][2] !== 0 ){
		score.draw++
		game = [[0,0,0] ,[0,0,0], [0,0,0]];
		turn = 0;
		alert("Draw");
  		for (var i = 0; i < mapOfBoardReverse.length; i++) {
 			$(".square" + i + "-mark-X").css("display", "none");		        		      
 			$(".square" + i + "-mark-O").css("display", "none");		        		      
 		};
		$("#draw_score").text("Draw: " + score.draw);	
		return;
	}
}


theGameOrder();

});