const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

//Fetch questions from Open Trivia API
fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions.results)
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };
            //  Randomly splices correct answer into answer choices
            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestion.answer - 1, 0,
                loadedQuestion.correct_answer);

            // Iterates thru answerChoices & assigns index for each answer choice
            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        startGame();
    })
    .catch(err => {
        console.log(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
// Value added to score when answering correctly
const MAX_QUESTIONS = 3;
//Max number of Qs a user gets before game ends.

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    //By using the spread operator, making changes to either of these variables
    //won't affect the other ie: availableQuestions = questions;
    getNewQuestion();
    // Displays game and hides loader
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {

    //Save score & End game
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //Checks if any Qs are left or max num of Qs has been answered
        localStorage.setItem('mostRecentScore', score);
        // Go to the game over page
        return window.location.assign("./end.html");
    }
    //Move to next question
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Updates the HUD text telling user which question they're on


    // Update progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    //Turns expression into a % of the progress bar that should be styled. 

    //Grabs a random question based on # of Qs left in availableQuestions array
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    //Updates question text based on what Q the user is currently on
    question.innerText = currentQuestion.question;

    //Populates answer choices w/ currentQuestion
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        // Looks at data-number in each answer choice
        choice.innerText = currentQuestion['choice' + number];
    });

    //Remove answered question from availableQuestions array
    //1 means remove 1 item
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        //Sets default class to 'incorrect'. If correct answer is chosen, updates to 'correct';
        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }

        //Checks if answer was correct before running incrementScore function
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
            //Passes in CORRECT_BONUS value as num in incrementScore function
        }

        // Adds correct/incorrect class to selectedChoice
        selectedChoice.parentElement.classList.add(classToApply);
        //Correct class = green, incorrect class = red in game.css

        //Removes classToApply (correct/incorrect) after 1 second
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

//Increases score for correct answers
//CORRECT_BONUS is passed in as num
incrementScore = num => {
    //let score = score + num
    score += num;
    //Update score text as score increases
    scoreText.innerText = score;
};




