// start by setting the variables to keep track of game state
// currentQuesiton
// timeRemaining


//  Declare your dom elements such as 
// submit button dom Element
// timer Element
// score

// function to start timer and then call question function to generate the first question and answer buttons.

// function to pull question from questions array and generate buttons with answers by looping over the answer arrays.   

// event function to grab the value of the button clicked and compare to answer.  If same recall question function for the next question, else decrement timer and recall question function for next question

// function to end quiz and capture time remaining as high score.  Store the highscores in local storage.  Dont forget to format the data coming back from high scores in descending order



var exampleQuestions = [  //DO NOT USE THESE QUESTIONS OR YOU WILL BE FLAGGED FOR PLAGIARISM
    {
        title: 'Commonly used data types DO NOT include:',
        choices: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 'alerts',
    },
    {
        title: 'The condition in an if / else statement is enclosed within ____.',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
        answer: 'parentheses',
    },
    {
        title: 'Arrays in JavaScript can be used to store ____.',
        choices: [
            'numbers and strings',
            'other arrays',
            'booleans',
            'all of the above',
        ],
        answer: 'all of the above',
    },
    {
        title:
            'String values must be enclosed within ____ when being assigned to variables.',
        choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
        answer: 'quotes',
    },
    {
        title:
            'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
        answer: 'console.log',
    },
];