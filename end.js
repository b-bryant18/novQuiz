const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');

//Retrieve highScores from LS or retrieve empty array if no scores
const highScores = JSON.parse(localStorage.getItem("highscores")) || [];
//localStorage saves items as strings by default
//Use JSON.parse to turn string into object when getting items from LS

//Limit num of scores saved to array
const MAX_HIGH_SCORES = 5;

//Displays final score
finalScore.innerText = mostRecentScore;

//Save button disabled unless username is entered
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

//Runs when save button is clicked
saveHighScore = (e) => {
    console.log("I clicked the save button")
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
    };

    //Push new score to highScores array
    highScores.push(score);

    //Sort highScores: high to low
    highScores.sort((a, b) => b.score - a.score);

    //Keep top 5 scores only
    highScores.splice(5);

    //Save new highScores to LS
    localStorage.setItem('highScores', JSON.stringify(highScores));
    //Turn objects into strings 
    //Use JSON.stringify to turn objects into strings when setting items to LS

    console.log(highScores);


    //Return to home page
    window.location.assign('/');
};