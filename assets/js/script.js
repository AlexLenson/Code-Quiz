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

// Global variables
var count = 0;
var timeLeft = 60;
var score = 0;
var scores = [];
var timerInterval;

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
var clearHighscoresBtn = document.querySelector("#clear-highscores-btn");
var viewHighscoresEl = document.querySelector("#view-highscores");

// Loads home page
function loadHomePage() {
    document.getElementById("home-page").style.display = "flex";
    document.getElementById("questions-page").style.display = "none";
    document.getElementById("results-page").style.display = "none";
    document.getElementById("highscores-page").style.display = "none";
    viewHighscoresEl.style.visibility = "visible";
}

// Loads questions page and set timer
function loadQuestionsPage() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("questions-page").style.display = "flex";
    document.getElementById("results-page").style.display = "none";
    document.getElementById("highscores-page").style.display = "none";
    viewHighscoresEl.style.visibility = "visible";
    getQuestion(count);
    setTimer();
}

// Loads results page
function loadResultsPage() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("questions-page").style.display = "none";
    document.getElementById("results-page").style.display = "block";
    document.getElementById("highscores-page").style.display = "none";
    viewHighscoresEl.style.visibility = "visible";
}

// Load highscores page
function loadHighscoresPage() {
    document.getElementById("home-page").style.display = "none";
    document.getElementById("questions-page").style.display = "none";
    document.getElementById("results-page").style.display = "none";
    document.getElementById("highscores-page").style.display = "block";
    viewHighscoresEl.style.visibility = "hidden";
}

// Sets timer
function setTimer() {
    timerInterval = setInterval(function () {
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

function displayNoBlanksMessage() {
    resultsFooterEL.style.display = "block";
    resultsFooterEL.innerHTML = "Initials cannot be blank"
}

// Store highscores in local storage
function storeHighscores() {
    var initials = initialsInput.value;
    if (initials === "") {
        displayNoBlanksMessage();
    } else {
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

// get scores from local storage
function retrieveHighscores() {
    var storedScores = JSON.parse(localStorage.getItem("scores"));

    if (storedScores !== null) {
        scores = storedScores;
    }
    displayHighscores()
}

// creates a new <li> for each new highscore
function displayHighscores() {
    // delete all li so that duplicates are not created
    highscoresListEl.innerHTML = "";

    // sort array in decending order based on score before appending to list
    scores.sort((a, b) => b.score - a.score);
    console.log(scores);

    // create a new li for each highscore
    for (var i = 0; i < scores.length; i++) {
        var highscore = scores[i];
        var rank = i + 1;
        var li = document.createElement("li");
        li.innerHTML = rank + ". " + highscore.initials + " - " + highscore.score;
        highscoresListEl.appendChild(li);
    }
}


// Event listeners

// Loads questions page
startBtn.addEventListener("click", loadQuestionsPage);

// Check if selected answer is correct and load next question
answersContainer.addEventListener("click", function(event) {
    var selectedAnswer = event.target;
    var currentQuestion = questions[count];

    if (selectedAnswer.innerHTML === currentQuestion.answer && count < (questions.length - 1)) {
        // get next question
        count++;
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
    event.preventDefault();
    storeHighscores();
});

// when go back button is clicked, load homepage 
goBackBtn.addEventListener("click", function(event) {
    count = 0;
    timeLeft = 60;
    timeEl.textContent = "";
    loadHomePage();
});

// when clear highscores button is clicked, clear highscores from list and local storage
clearHighscoresBtn.addEventListener("click", function(event) {
    highscoresListEl.innerHTML = "";
    localStorage.clear();
    scores = [];
})

// when view highscores is clicked, loads highscores page and stops timer
viewHighscoresEl.addEventListener("click", function(event) {
    loadHighscoresPage();
    clearInterval(timerInterval);
    timeEl.textContent = "";
})