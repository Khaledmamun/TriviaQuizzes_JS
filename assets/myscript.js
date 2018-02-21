var triviaQuestions = [{
	question: "The famous Turkish landmark?",  
	answerList: ["Taj Mahal", "Statue of Liberty", "Eiffel Tower", "Hagia Sophia"],
	answer: 3  // # 1
},{
	question: "Which tech mogul provided funding and became a co-founder of Pixar?",
	answerList: ["Steve Jobs", "Bill Gates", "Peter Thiel", "Mark Zuckerberg"],
	answer: 0  // # 2
},{
	question: "Which one is the Hindu god?",
	answerList: ["Shiva", "Jupiter", "RA", "Poseidon"],
	answer: 0  // # 3
},{
	question: "Who invented the Alternating Current (AC)?",
	answerList: ["Thomas Edison", "Isaac Newton", "Nikola Tesla", "Albert Einstein"],
	answer: 2  // # 4
},{
	question: "What is the capital of Australia?",
	answerList: ["Adelaide", "Melbourne", "Sydney", "Canberra"],
	answer: 3  // # 5
},{
	question: "Dwight D. Eisenhower was ____th President of United States",
	answerList: ["34", "35", "46", "17"],
	answer: 0  // # 6
},{
	question: "Which film won Pixar's first Academy Award for Best Animated Feature?",
	answerList: ["Toy Story", "Finding Nemo", "Up", "Wall-E"],
	answer: 1  // # 7
},{
	question: "Who played the title character of the movie Indiana Jones?",
	answerList: ["Brad Pitt", "Tom Hanks", "Harrison Ford", "Tom Cruise"],
	answer: 2  // # 8
},{
	question: "Which two songs by Adele reached number 1 position in the US during 2011?",
	answerList: ["'Rolling in the Deep' and 'Best for Last'", "'Rolling in the Deep' and 'Someone Like You'", "'He Won't Go' and 'Someone Like You'", "'I Miss You' and 'Skyfall'"],
	answer: 1  // # 9
},{
	question: "During which World War did the Battle of the Somme occur??",
	answerList: ["Waterloo", "Austria-Ottoman Wars", "World War Two", "World War One"],
	answer: 3  // # 10
},{
	question: "Diamond and coal both contain what?",
	answerList: ["Carbon", "Indium", "Niobium", "Radium"],
	answer: 0  // # 11
},{
	question: "What did Benjamin Franklin invent??",
	answerList: ["The United States Constitution", "Lightning Conductor", "Declaration of independence", "Preamble to the United States Constitution"],
	answer: 1  // # 12
},{
	question: "Which 3 elements can be magnetised?",
	answerList: ["Boron, Cobalt, and Nickel", "Iron, Boron, and Cobalt", "Iron, Nickel, and Fermium", "Iron, Nickel, and Cobalt"],
	answer: 3  // # 13
},{
	question: "Which ocean separates Africa and South America?",
	answerList: ["The Atlantic Ocean", "The Pacific Ocean", "The Southern Ocean", "The Indian Ocean"],
	answer: 0  // # 14
},{
	question: "Which imaginary creature has the head of a man and body of a lion?",
	answerList: ["Tengu", "Cyclopes", "Sphinx", "Griffins"],
	answer: 2  // # 15
},{
	question: "holy city for three major religions of the world: Islam, Christianity, and Judaism?",
	answerList: ["Constantinople", "Bethlehem", "Vatican", "Jerusalem"],
	answer: 3  // # 16
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 
				'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 
				'question13','question14','question15','question16'];

var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; 

var answered; var userSelect;

var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i }); // (MTF)
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index'); // (MTF)
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 25;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3> <hr>' );
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3> <hr>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');

	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('¿-Start Over-?');
}