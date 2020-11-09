const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions =
    [
        {
            "question": "Inside which HTML element do we put the JavaScript??",
            "choice1": "<script>",
            "choice2": "<javascript>",
            "choice3": "<js>",
            "choice4": "<scripting>",
            "answer": 1
        },
        {
            "question": "What is the correct syntax for referring to an external script called 'xxx.js'?",
            "choice1": "<script href='xxx.js'>",
            "choice2": "<script name='xxx.js'>",
            "choice3": "<script src='xxx.js'>",
            "choice4": "<script file='xxx.js'>",
            "answer": 3
        },
        {
            "question": " How do you write 'Hello World' in an alert box?",
            "choice1": "msgBox('Hello World');",
            "choice2": "alertBox('Hello World');",
            "choice3": "msg('Hello World');",
            "choice4": "alert('Hello World');",
            "answer": 4
        }
    ];

//CONSTANTS
const CORRECT_BONUS = 10;
// Value added to score when answering correctly
const MAX_QUESTIONS = 3;
//Max number of Qs a user gets before game ends.

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    //By using the spread operator, making changes to either of these
    //won't affect the other like in availableQuestions = questions;
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    //Grabs a random question based on # of Qs left in availableQuestions array
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
};

startGame();



