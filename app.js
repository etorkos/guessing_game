//Guessing Game app.js

function Game () { //master function
	this.goal = 50; //default
	this.guessCount = -1;
	this.active = true;
	this.state = 'frigid';
	this.guesses = [];

	this.newGame = function() {
		this.goal = Math.floor(Math.random() * 100)+1;
		this.guessCount = 0;
		this.active = true;
	}

	this.diff = function (guess){
		if (Math.abs(guess - this.goal) > 40) {
			this.state = "frigid";
		}
		else if (Math.abs(guess - this.goal) > 25) {
			this.state = "cold";
		}
		else if (Math.abs(guess - this.goal) >= 1){
			this.state = "warm";
		}
		else if (Math.abs(guess - this.goal) == 0){
			this.state = "fire"
		}
	}

	this.reccommend = function (guess) {
		if(guess > this.goal) {
			return "You are "+this.state+", guess lower ";
		}
		else {
			return "You are "+this.state+", guess higher" ;
		}
	}

	this.guess = function(guess) {
		if (this.guessCount === -1){
			this.newGame();
		}

		 if (guess === this.goal) {
			myGame.active = false;
			this.diff(guess);
			this.guesses.push(guess);
		}
		else {
			this.guessCount++;
			this.guesses.push(guess);
			this.diff(guess);
		}
	}
}

var maxGuesses = 3;
var myGame = new Game();

$(document).ready(function(){
	$('.makeAGuess').click(function(event) {
		var hisGuess = +$('.guess').val();

			if (myGame.guessCount == -1 ) {
				myGame.newGame();
				}

			if (myGame.active == true) {
				myGame.guess(hisGuess);

				if (myGame.active == false || myGame.guessCount >= maxGuesses) {
					if(myGame.state == "fire") {
						$('body').css('background', 'url(volcano.jpg)');
						$('body').css('background-size', '100%');
						$('ul').append("<li>You Have WON!!!!</li>");
					}
					else {
					$('ul').append("<li>You Have Failed, Try Again...</li>");
					}
					$('.makeAGuess').prop('disabled', true);
					$('.hint').prop('disabled', true);
				}	
				else if(myGame.state == "frigid") {
					$('body').css('background', 'url(ice.jpg)');
					$('body').css('background-size', '100%');
					$("ul").append(function(){
						return "<li>"+ myGame.reccommend(hisGuess)+"</li>";
					});
				}
				else if(myGame.state == "cold") {
					$('body').css('background', 'url(close.jpg)');
					$('body').css('background-size', '100%');
					$("ul").append(function(){
						return "<li>"+ myGame.reccommend(hisGuess)+"</li>";
					});
				}
				else if(myGame.state == "warm") {
					$('body').css('background', 'url(normal.jpg)');
					$('body').css('background-size', '100%');
					$("ul").append(function(){
						return "<li>"+ myGame.reccommend(hisGuess)+"</li>";
					});
				}
			}
	});
});

	$(document).ready(function(){
		$('.guess').keyup(function(){
			this.value = this.value.replace(/[^0-9\.]/g,'');
		});
	});

$(document).ready(function(){
	$('.reset').click(function(event){
		myGame.newGame();
		$('.makeAGuess').prop('disabled', false);
		$('.hint').prop('disabled', false);
		$('body').css('background', 'url(ice.jpg)');
		$('body').css('background-size', '100%');
		alert("Game is Restarting!")
		//unlock options
	});
});

$(document).ready(function(){
	$('.hint').click(function(event){
		var range = (myGame.goal+ Math.ceil(Math.random()*10)) +" and " +(myGame.goal- Math.ceil(Math.random()*10));
		$("ul").append(function(){
					return "<li>"+"I'd Guess between "+range +"</li>";
				});
	});
});
