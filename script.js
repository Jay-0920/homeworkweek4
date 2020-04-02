//arrray of the questions, avaialble choices, and correct answers     
var question = [{
    title: "Which fictional city is the home of Batman?",
    choices: ["Sandy( )", "Bikini Bottom( )", "Orem( )", "Gotham City( )"],
    answer: "Gotham City( )"
},
{
    title: "Who is the current President?",
    choices: ["Mickey Mouse( )", "Your Brother( )", "Donald Trump( )", "Barrack Obama( )"],
    answer: "Donald Trump( )"
},
{
    title: "What current season are we in?",
    choices: ["Winter( )", "Summer( )", "Fall( )", "None of the above."],
    answer: "None of the Above( )"
},
{
    title: "Which of the following function of an array object adds and/or removes elements from an array?",
    choices: ["toSource( )", "sort( )", "unshift( )", "splice( )"],
    answer: "splice( )"
},
{
    title: "Which of the following function of String object combines the text of two strings and returns a new string?",
    choices: ["add( )", "concat( )", " merge( )", "append( )"],
    answer: "concat( )"
}
]

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

timeLeft = 83;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    //proceed to end the game function when timer is below 0 at any time
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//stop the timer to end the game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 10 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `Highscore:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = '<h1>Random Question Quiz!</h1>'
'<h3>Click to play!</h3>'
'<button onclick="start()">Start!</button>';

document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 3seconds from the timer if user chooses an incorrect answer
function incorrect() {
timeLeft -= 3; 
next();
}

//increases the score by 10points if the user chooses the correct answer
function correct() {
score += 10;
next();
}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > question.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + question[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < question[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", question[currentQuestion].choices[buttonLoop]);
    if (question[currentQuestion].choices[buttonLoop] == question[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}