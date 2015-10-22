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
,[4,5,6]
,[7,8,9]];

//To win or play tie if computer starts

regel 1:

function ruleNumber1(){
	if (computer is player X){
		place X on 5 OR on 1,3,7,9
	}
}



function ruleAlwaysThreeInRow(){
	if (two X in a row always put the third X)
}

function alwaysBlockTwo(){
	if(player O has two in a row always block with X)
}



function testIfWinner(){
	if(three-in-a-row){
		return "winner";
	}
	else {
		return "still no winner";
	}
}