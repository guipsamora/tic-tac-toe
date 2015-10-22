                                        move 1
                                        /   \
                                       /     \
                                      /       \
                                   move 2    move 2     


[- - -]
[- X -]
[- - -]

1. Spelare 1 har tre val. Centrum, hörn, mitt-sida.

Regel 1a: Spelare X väljer centrum. - - Check
	Regel 2a: Spelare O måsta välja hörn
		Regel 3a: Spelare X måste välja hörn som är i linje med Os hörn.
			Regel 4a: Spelare O måste välja ett hörn.

[				Regel 5a: Spelare X måste blockera där det står två OO            ]
[					Regel 6a: Spelare O måste blockera där det står två XX          ]
[						Regel 7a: Spelare X måste blockera där det står två OO        ] ---- Blockera alltid 
[	  					Regel 8a: Spelare O måste blockera där det står två XX      ]      där det finns två
[	  						Regel 9a: Spelare X måste blockera där det står två OO    ]  

Regel 1b: Spelare X måste välja hörn
	Regel 2a: Spelare O måste välja centrum
		Regel 3a: Spelare X måste välja hörn i motsatt riktning som sitt första X
			Regel 4a: Spelare O måste välja mitt-sida.
				Regel 5a. Spelare X måste blockera där det står två OO.
					Regel 6a: Spelare O måste blockera där det står två XX;
						Regel 7a: Spelare x måste blockera där det står två OO;
							Regel 8a. Spelare O måste blockera där det står två XX
								Regel 9a. Spelare X måste blockera där det står två OO

var game = 
[[1,2,3]
,[4,X,6]
,[7,8,9]];

//To win or play tie if computer starts

// Build game rules how the game is
	// 


// Player moves
	// 

// Computer moves are instructions for him to follow


// figure out how to count the symbolys (say that a row / column or diagonal is empty)

Rule 1:


[[1,2,3]
,[4,5,6]
,[7,8,9]];

//Names of positions:
//Corner - 1,3,7,9
//Center - 5
//Middle - 2,4,6,8


//Game function

function game(){
	if (bord-is-clean === true){
		ruleNumber1();
	}
	if ()
}


//Rule fuctions
// on first move - computer
function ruleNumber1(){
	if (computer is player X){
		place X on 5 OR on 1,3,7,9
		game.replace(5 with X);
	}
}

//on second move - computer
function humanPlacesCenter(){
	condition: if computer has put X in a corner. and human has 
	put O in center, put X in opposite corner of the first X
}

function humanPlacesMiddle(){
	Condition: Computer has played corner, 
	and human has played middle.
	Play center
}

function humanPlacesCorner(){
	Condition: Computer has played corner
	Human has played corner
	Computer plays center
}

//on second move - computer

function humanPlacesMiddle(){
	Condition: Computer has played center, 
	and human has played middle.
	computer plays Corner that is empty
}

function humanPlacesCorner(){
	Condition: Computer has played center
	Human has played corner
	computer plays Corner that is empty / opposite
}

// check if there is a winner other wise game go on
function testIfWinner(){
	if(three-in-a-row/column/cross){
		return "winner";
	}
	else {
		return "still no winner";
	}
}
// game go on

// this rule is more important than blockHuman function
function ruleAlwaysThreeInRow(){
	if (two X in a row always put the third X)
	if you have 2 marks in one row or column or diagnol then you put the third
}

function blockHuman(){
	Condition: when human has two in a row: always block.
}

// two rows and blocked
function touchMost(){
	Condition: human blocked the computer, thus you cant invoke ruleAlwaysThreeInRow
	Computer been blocked after having two in a row diagonally.
	place X in position where it touches most Xs OR empty.

	place a condition to define touch

	if (opponent symbol is in the same row or column or diaginolly === 0)
	if (opponent symbolis is not in the row === 1)

}




check diagnol / row / column  if it touches 

function buildTwoInRow(){
	check the best position, is the row already taken or not (empty)
	if so, doesn't play it there, if not place it there

}

function alwaysBlockTwo(){
	if(player O has two in a row always block with X)
}


//Move-functions

function firstMove(){

	var number = ruleNumber1()
	replace number with X
	testIfWinner();

}

identify which place is empty, if in the array there is a number then is empty 
if the element in array is an X or O the element should be blocked

function secondMove(){
	var secondMoveNumber = $("#").val()
	replace secondMoveNumber with O
}



if certain condition then you call a certain function





