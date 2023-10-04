// Quiz questions
var questions = [
    {
        title: "Which data type is used to represent whole numbers in JavaScript?",
        choices: ["String", "Boolean", "Integer", "Number"],
        answer: "Number"
    },
    {
        title: "Which of the following is a valid comment in JavaScript?",
        choices: ["// This is a comment", "!This is a comment", "/*This is a comment*/", "#This is a comment"],
        answer: "// This is a comment"
    },
    {
        title: "How do you write a function in JavaScript?",
        choices: ["function: myFunction()", "function myFunction()", "myFunction(): function", "myFunction() = function"],
        answer: "function myFunction()"
    },
    {
        title: "What is the result of 2 + '2' in JavaScript?",
        choices: ["4", "22", "TypeError", "NaN"],
        answer: "22"
    },
    {
        title: "Which built-in method can be used to convert a string to uppercase in JavaScript?",
        choices: ["toUpperCase()", "toUpper()", "toUpperCaseCase()", "upperCase()"],
        answer: "toUpperCase()"
    }
];



// start by setting the variables to keep track of game state
// currentQuesiton
// timeRemaining

//  Declare your dom elements such as
// submit button dom Element
// timer Element
// score


// Global variables
var count = 0;
var timeLeft = 60;
var score = 0;
var scores = [];

// Elements
var startBtn = document.querySelector("#start-quiz-btn");
var questionTitle = document.querySelector("#question-title");
var answerChoices = document.querySelectorAll("#questions-page button");
var answersContainer = document.querySelector("#answers-container");
var questionsFooterEL = document.querySelector("#questions-footer");
var timeEl = document.querySelector("#time");
var scoreEl = document.querySelector("#score");
var submitBtn = document.querySelector("#submit-btn");
var initialsInput = document.querySelector("#initials");
var resultsFooterEL = document.querySelector("#results-footer");
var goBackBtn = document.querySelector("#go-back-btn");
var highscoresListEl = document.querySelector("#highscores-list");



// Loads questions page and set timer
function loadQuestionsPage() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("questions-page").style.display = "flex";
    document.getElementById("results-page").style.display = "none";
    document.getElementById("highscores-page").style.display = "none";
    getQuestion(count);
    setTimer();
}

// Loads results page
function loadResultsPage() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("questions-page").style.display = "none";
    document.getElementById("results-page").style.display = "block";
    document.getElementById("highscores-page").style.display = "none";
}

// Load highscores page
function loadHighscoresPage() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("questions-page").style.display = "none";
    document.getElementById("results-page").style.display = "none";
    document.getElementById("highscores-page").style.display = "block";
}

// Sets timer
function setTimer() {
    var timerInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = "Time: " + timeLeft;

        if (timeLeft === 0 || timeLeft < 0) {
            clearInterval(timerInterval);
            // get results page
            loadResultsPage();
            timeLeft = 0;
            timeEl.textContent = "Time: " + timeLeft;
            score = timeLeft;
            scoreEl.textContent = "Your final score is " + score + ".";
        } else if (count === (questions.length - 1)) {
            // stop timer and set time remaining as score
            clearInterval(timerInterval);
            score = timeLeft;
            scoreEl.textContent = "Your final score is " + score + ".";
        }

    }, 1000);
}

// Gets a question and displays to page
function getQuestion(count) {
    // console.log(`inside function: ${count}`);
    var currentQuestion = questions[count];
    questionTitle.innerHTML = currentQuestion.title;
    
    for (let i = 0; i < currentQuestion.choices.length; i++) {
        answerChoices[i].innerHTML = currentQuestion.choices[i];
    }

}

// Hides questions footer
function hideQuestionsFooter() {
    questionsFooterEL.style.display = "none";
}

// Displays "Correct" in footer
function displayCorrect() {
    questionsFooterEL.style.display = "block";
    questionsFooterEL.innerHTML = "Correct";
    questionsFooterEL.style.color = "green";
    setTimeout(hideQuestionsFooter, 3000);
}

// Displays "Incorrect" in footer
function displayIncorrect() {
    questionsFooterEL.style.display = "block";
    questionsFooterEL.innerHTML = "Incorrect";
    questionsFooterEL.style.color = "red";
    setTimeout(hideQuestionsFooter, 3000);
}


// // Hides results footer
// function hideResultsFooter() {
//     resultsFooterEL.style.display = "none";
// }

// // Shows results footer
// function showResultsFooter() {
//     resultsFooterEL.style.display = "block";
// }

function displayNoBlanksMessage() {
    resultsFooterEL.style.display = "block";
    resultsFooterEL.innerHTML = "Initials cannot be blank"
}

// function displaySubmittedMessage() {
//     resultsFooterEL.style.display = "block";
//     resultsFooterEL.innerHTML = "Highscore successfully submitted"
// }


// Store highscores in local storage
function storeHighscores() {
    var initials = initialsInput.value;
    // console.log(initials);
    // console.log(score);
    if (initials === "") {
        displayNoBlanksMessage();
    } else {
        // displaySubmittedMessage();
        initialsInput.value = "";
        var player = {
            initials: initials,
            score: score
        }
        scores.push(player);
        localStorage.setItem("scores", JSON.stringify(scores));
        loadHighscoresPage();
        retrieveHighscores();
    }
}

function retrieveHighscores() {
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    // console.log(storedScores);

    if (storedScores !== null) {
        scores = storedScores;
        // console.log(scores);
    }
    displayHighscores()
}

// creates a new <li> for each new highscore
function displayHighscores() {
    // delete all li so that duplicates are not created
    highscoresListEl.innerHTML = "";
    // create a new li for each highscore
    for (var i = 0; i < scores.length; i++) {
        var highscore = scores[i];
        // console.log(highscore);
        // console.log(typeof(highscore));

        var li = document.createElement("li");
        li.innerHTML = highscore.initials + " - " + highscore.score;
        // li.setAttribute("data-index", i);

        // var button = document.createElement("button");
        // button.textContent = "Complete ✔️";

        // li.appendChild(button);
        highscoresListEl.appendChild(li);
    }
}


// function to start timer and then call question function to generate the first question and answer buttons.

// function to pull question from questions array and generate buttons with answers by looping over the answer arrays.   

// event function to grab the value of the button clicked and compare to answer.  If same recall question function for the next question, else decrement timer and recall question function for next question

// function to end quiz and capture time remaining as high score.  Store the highscores in local storage.  Dont forget to format the data coming back from high scores in descending order



// Event listeners

// Loads questions page
startBtn.addEventListener("click", loadQuestionsPage);

// Check if selected answer is correct and load next question
answersContainer.addEventListener("click", function(event) {
    var selectedAnswer = event.target;
    var currentQuestion = questions[count];
    // console.log(currentQuestion);
    // console.log(`inside listener: ${count}`);

    if (selectedAnswer.innerHTML === currentQuestion.answer && count < (questions.length - 1)) {
        // get next question
        count++;
        // console.log(`inside listener: ${count}`);
        getQuestion(count);
        displayCorrect();
    } else if (selectedAnswer.innerHTML !== currentQuestion.answer && count < (questions.length - 1)) {
        // decrement timer by 10 sec
        timeLeft-=10;
        displayIncorrect();
    } else {
        // get results page
        loadResultsPage();
    }
})

// when submit button is clicked, load highscores into local storage and display on highscores page
submitBtn.addEventListener("click", function(event) {
    // console.log(event.target);
    event.preventDefault();
    storeHighscores();
});

goBackBtn.addEventListener("click", function(event) {
    count = 0;
    timeLeft = 60;
    loadQuestionsPage();
});